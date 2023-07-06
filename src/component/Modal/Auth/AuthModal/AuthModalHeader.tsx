import { AuthModalState } from '@/atoms/authModalAtom';
import { ModalHeader } from '@chakra-ui/react';

interface AuthModalHeaderProps {
  modalState: AuthModalState;
}

const AuthModalHeader = (props: AuthModalHeaderProps) => {
  const { modalState } = props;
  return (
    <ModalHeader textAlign='center'>
      {modalState.view === 'login' && 'Login'}
      {modalState.view === 'signup' && 'Sign Up'}
      {modalState.view === 'resetPassword' && 'Reset Password'}
    </ModalHeader>
  );
};

export default AuthModalHeader;
