import { authModalState } from '@/atoms/authModalAtom';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

// Firebase sign in with email and password
import { auth } from '@/firebase/clientApp';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '@/firebase/errors';

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = (props: LoginProps) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // update login form state
  const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = loginForm;
    signInWithEmailAndPassword(email, password);
  };

  const inputStyles = {
    fontSize: '10pt',
    _placeholder: {
      color: 'gray.500',
    },
    _hover: {
      bg: 'white',
      border: '1px solid',
      borderColor: 'blue.500',
    },
    _focus: {
      outline: 'white',
      bg: 'white',
      border: '1px solid',
      borderColor: 'blue.500',
    },
    bg: 'gray.50',
  };

  return (
    <Box mb={4} width='100%'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <VStack spacing={4} align='stretch'>
          <Input
            name='email'
            type='email'
            placeholder='Email'
            onChange={(e) => handleLoginForm(e)}
            {...inputStyles}
          />
          <Input
            name='password'
            type='password'
            placeholder='Password'
            onChange={(e) => handleLoginForm(e)}
            {...inputStyles}
          />

          {error && (
            <Alert
              status='error'
              borderRadius='xl'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
            >
              <AlertIcon mb={1} />
              {FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}
            </Alert>
          )}

          <Button
            height='36px'
            variant='auth'
            type='submit'
            isLoading={loading}
          >
            Log In
          </Button>

          <Flex justifyContent='center' mb={2}>
            <Text fontSize='9pt' mr={1}>
              Forgot your password?
            </Text>
            <Text
              fontSize='9pt'
              color='blue.500'
              cursor='pointer'
              onClick={() =>
                setAuthModalState({
                  isOpen: true,
                  view: 'resetPassword',
                })
              }
            >
              Reset
            </Text>
          </Flex>

          <Flex fontSize='10pt'>
            <Text mr={1}>New Here?</Text>
            <Text
              color='blue.500'
              fontWeight={700}
              cursor='pointer'
              textDecoration={'underline'}
              onClick={() =>
                setAuthModalState({
                  isOpen: true,
                  view: 'signup',
                })
              }
            >
              Sign Up
            </Text>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
