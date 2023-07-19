import { Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Utils/Helpers
import { validateCommunityName } from '@/utils/validateCommunityName';

// Hooks
import useCreateCommunity from '@/hooks/useCreateCommunity';
import useCreateCommunityFormState from '@/hooks/useCreateCommunityFormState';
import useCreateCommunityModalState from '@/hooks/useCreateCommunityModalState';
import useDirectory from '@/hooks/useDirectory';

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
  const { createCommunity, loading, error, resetCommunityError } = useCreateCommunity();
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

  //STATE
  const [validationError, setValidationError] = useState<string | null>('');

  const closeModalAndToggleMenu = () => {
    if (directoryState.isOpen === true) toggleMenuOpen();
    if (modalState.isModalOpen === true) closeModal();
  };

  const closeModalAndResetForm = () => {
    closeModal();
    resetForm();
    resetCommunityError();
    setValidationError('');
  };

  const submitCommunity = async () => {
    setValidationError(null);
    const validationCheckResult = validateCommunityName(communityName);
    if (validationCheckResult) return setValidationError(validationCheckResult);
    try {
      const operationResult = await createCommunity(communityName, communityType, isAdult);
      if (operationResult) {
        resetForm();
        closeModalAndToggleMenu();
        router.push(`/r/${communityName}`);
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setValidationError(null);
    }
  };

  return (
    <Modal isOpen={modalState.isModalOpen} onClose={closeModalAndResetForm}>
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
              {(validationError || error) && <CreateCommunityModalError error={validationError || error} />}
            </VStack>
            <CreateCommunityModalTypes communityType={communityType} handleCommunityType={handleCommunityType} />
            <CreateCommunityModalAdult handleNSFW={handleNSFW} isAdult={isAdult} />
          </VStack>
        </ModalBody>
        <CreateCommunityModalFooter
          loading={loading}
          submitCommunity={submitCommunity}
          closeModalAndResetForm={closeModalAndResetForm}
        />
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunityModal;
