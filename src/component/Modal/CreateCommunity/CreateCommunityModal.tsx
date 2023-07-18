import useCreateCommunityFormState from '@/hooks/useCreateCommunityFormState';
import useCreateCommunityModalState from '@/hooks/useCreateCommunityModalState';
import useDirectory from '@/hooks/useDirectory';
import { Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

// Utils/Helpers
import { validateCommunityName } from '@/utils/validateCommunityName';

// Hooks
import useCreateCommunity from '@/hooks/useCreateCommunity';

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
  const { createCommunity, loading, error } = useCreateCommunity();
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

  const closeModalandMenu = () => {
    if (directoryState.isOpen === true) toggleMenuOpen();
    if (modalState.isModalOpen === true) closeModal();
  };

  const submitCommunity = async () => {
    const validationError = validateCommunityName(communityName);
    if (validationError) {
      alert(validationError);
      // TODO: Add a ERROR STATE for validation errors
      // setError(validationError);
      return;
    }

    console.log('No validation errors');

    try {
      const success = await createCommunity(communityName, communityType, isAdult);
      if (success) {
        resetForm();
        closeModalandMenu();
        router.push(`/r/${communityName}`);
      }
    } catch (error: any) {
      console.error(error);
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
