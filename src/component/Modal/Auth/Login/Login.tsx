import { Alert, AlertIcon, AlertProps, Box, Button, VStack } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';

// Recoil
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

// Firebase
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

// Components
import AuthSwitch from '../AuthView';
import LoginInput from './LoginInput';

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = (props: LoginProps) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = loginForm;
    signInWithEmailAndPassword(email, password);
  };

  const alertStyles: AlertProps = {
    status: 'error',
    borderRadius: 'xl',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  return (
    <Box mb={4} width='100%'>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align='stretch'>
          <LoginInput name='email' type='email' isRequired placeholder='Email' handleLoginForm={handleLoginForm} />
          <LoginInput
            name='password'
            type='password'
            isRequired
            placeholder='Password'
            handleLoginForm={handleLoginForm}
          />

          {error && (
            <Alert {...alertStyles}>
              <AlertIcon mb={1} />
              {FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}
            </Alert>
          )}

          <Button height='36px' variant='auth' type='submit' isLoading={loading}>
            Log In
          </Button>

          <AuthSwitch view={'resetPassword'} setAuthModalState={setAuthModalState} />
          <AuthSwitch view={'signup'} setAuthModalState={setAuthModalState} />
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
