import { authModalState } from '@/atoms/authModalAtom';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuthButtons from '../OAuthButtons';

import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthModalHeader from './AuthModalHeader';

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.isOpen} onClose={() => handleClose()}>
        <ModalOverlay />
        <ModalContent>
          <AuthModalHeader modalState={modalState} />
          <ModalCloseButton />
          <ModalBody display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <VStack
              display='flex'
              direction='column'
              alignItems='center'
              justifyContent='center'
              width='70%'
              spacing={4}
            >
              {modalState.view != 'resetPassword' && (
                <>
                  <OAuthButtons />

                  <Text color='gray.500' fontWeight='700' textTransform='uppercase'>
                    Or
                  </Text>
                </>
              )}

              <AuthInputs />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
