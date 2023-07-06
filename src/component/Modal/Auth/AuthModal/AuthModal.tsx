import { authModalState } from '@/atoms/authModalAtom';
import {
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  StackProps,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';

import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthModalHeader from './AuthModalHeader';
import AuthModalOAuth from './AuthModalOAuth';

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  const ModalBodyStyles: ModalBodyProps = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const VStackStyles: StackProps = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    spacing: 4,
  };

  return (
    <>
      <Modal isOpen={modalState.isOpen} onClose={() => handleClose()}>
        <ModalOverlay />
        <ModalContent>
          {/* HEADER */}
          <AuthModalHeader modalState={modalState} />
          <ModalCloseButton />
          {/* BODY */}
          <ModalBody {...ModalBodyStyles}>
            <VStack {...VStackStyles}>
              {modalState.view != 'resetPassword' && <AuthModalOAuth />}
              <AuthInputs />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
