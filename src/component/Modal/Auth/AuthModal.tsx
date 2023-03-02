import { authModalState } from '@/atoms/authModalAtom';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FunctionComponent, useEffect } from 'react';

import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';

import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

interface AuthModalProps {}

const AuthModal: FunctionComponent<AuthModalProps> = (
  props: AuthModalProps
) => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  // triggered when user is logged in / logged out
  const [user, loading, error] = useAuthState(auth);
  // user: The auth.UserCredential if logged in | null
  // loading: boolean indicate whether the authentication state is still being loaded
  // error: Any AuthError by Firebase when trying to load the user, or undefined if there is no error

  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  useEffect(() => {
    if (user) {
      console.log(`🚀 ~ useEffect ~ user:`, user);
    }
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.isOpen} onClose={() => handleClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            {modalState.view === 'login' && 'Login'}
            {modalState.view === 'signup' && 'Sign Up'}
            {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
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

                  <Text
                    color='gray.500'
                    fontWeight='700'
                    textTransform='uppercase'
                  >
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
