import { auth, firestore } from '@/firebase/clientApp';
import useCreateCommunityFormState from '@/hooks/useCreateCommunityFormState';
import useCreateCommunityModalState from '@/hooks/useCreateCommunityModalState';
import useDirectory from '@/hooks/useDirectory';
import { Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, VStack } from '@chakra-ui/react';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Components
import CreateCommunityModalAdult from './CreateCommunityModalAdult';
import CreateCommunityModalError from './CreateCommunityModalError';
import CreateCommunityModalFooter from './CreateCommunityModalFooter';
import CreateCommunityModalHeader from './CreateCommunityModalHeader';
import CreateCommunityModalName from './CreateCommunityModalName';
import CreateCommunityModalTypes from './CreateCommunityModalTypes';

interface CreateCommunityModalProps {}

export type AccessLevel = 'public' | 'restricted' | 'private';

const CreateCommunityModal = (props: CreateCommunityModalProps) => {
  // HOOKS
  const router = useRouter();
  const { toggleMenuOpen, directoryState } = useDirectory();
  const { modalState, closeModal } = useCreateCommunityModalState();
  const {
    communityName,
    charsRemain,
    communityType,
    isAdult,
    handleCommunityName,
    handleCommunityType,
    handleNSFW,
    resetForm,
  } = useCreateCommunityFormState();

  // STATE
  const [user] = useAuthState(auth);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const closeModalandMenu = () => {
    if (directoryState.isOpen === true) {
      closeModal();
      toggleMenuOpen();
    }
  };

  const validateCommunityName = () => {
    // https://stackoverflow.com/a/32311188
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(communityName)) {
      return 'Community names can only contain letters and numbers';
    }

    if (communityName.length < 3) {
      return 'Community names must be at least 3 characters long';
    }

    if (communityName.length > 21) {
      return 'Community names must be less than 21 characters long';
    }

    return null;
  };

  const firestoreOperation = async () => {
    try {
      await runTransaction(firestore, async (transaction) => {
        const communityDocRef = doc(firestore, 'communities', communityName);
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry r/${communityName} is taken. Try another.`);
        }

        transaction.set(communityDocRef, {
          name: communityName,
          type: communityType,
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          nsfw: isAdult,
        });

        const communitySnippets = `users/${user?.uid}/communitySnippets`;
        const userDocRef = doc(firestore, communitySnippets, communityName);
        transaction.set(userDocRef, {
          communityId: communityName,
          isModerator: true,
        });
      });
    } catch (error) {
      throw error;
    }
  };

  const submitCommunity = async () => {
    const validationError = validateCommunityName();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);

    try {
      await firestoreOperation();
      resetForm();
      closeModalandMenu();
      router.push(`/r/${communityName}`);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={modalState.isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent maxW={'lg'} p={4}>
          <CreateCommunityModalHeader />
          <ModalCloseButton />
          <Divider mt={3} mb={2} />
          <ModalBody px={0}>
            <VStack spacing={6}>
              <VStack width={'100%'} align='flex-start' mb={3}>
                <CreateCommunityModalName
                  charsRemain={charsRemain}
                  communityName={communityName}
                  handleCommunityName={handleCommunityName}
                />
                {error && <CreateCommunityModalError error={error} />}
              </VStack>
              <CreateCommunityModalTypes communityType={communityType} handleCommunityType={handleCommunityType} />
              <CreateCommunityModalAdult handleNSFW={handleNSFW} isAdult={isAdult} />
            </VStack>
          </ModalBody>
          <CreateCommunityModalFooter loading={loading} submitCommunity={submitCommunity} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
