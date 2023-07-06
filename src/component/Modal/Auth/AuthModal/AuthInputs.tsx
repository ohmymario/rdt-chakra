import { authModalState } from '@/atoms/authModalAtom';
import { Flex } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

// Components
import Login from '../Login/Login';
import ResetPassword from '../ResetPassword/ResetPassword';
import SignUp from '../SignUp/SignUp';

const AuthInputs = () => {
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
