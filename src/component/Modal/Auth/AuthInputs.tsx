import { authModalState } from '@/atoms/authModalAtom';
import { Flex } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import Login from './Login/Login';
import ResetPassword from './ResetPassword';
import SignUp from './SignUp/SignUp';

interface AuthInputsProps {
  // props later :)
}

const AuthInputs: FunctionComponent<AuthInputsProps> = (props: AuthInputsProps) => {
  // only need state view
  const modalState = useRecoilValue(authModalState);

  return (
    <Flex direction='column' width='100%'>
      {modalState.view === 'login' && <Login />}
      {modalState.view === 'signup' && <SignUp />}
      {modalState.view === 'resetPassword' && <ResetPassword />}
    </Flex>
  );
};

export default AuthInputs;
