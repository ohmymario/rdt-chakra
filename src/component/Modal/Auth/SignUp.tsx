import { authModalState } from '@/atoms/authModalAtom';
import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

// firebase hooks email & password
import { auth } from '@/firebase/clientApp';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = (props: SignUpProps) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [SignupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);

  const [createUserWithEmailAndPassword, authUser, authLoading, authError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignupForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({
      ...SignupForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, confirmPassword } = SignupForm;

    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (authError && authError.code === 'auth/email-already-in-use') {
      setError('Email already in use');
      return;
    }

    if (authError && authError.code === 'auth/invalid-email') {
      setError('Invalid email');
      return;
    }

    if (authError && authError.code === 'auth/weak-password') {
      setError('Password must be at least 6 characters');
      return;
    }

    createUserWithEmailAndPassword(email, password);
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
            required
            placeholder='Email'
            onChange={(e) => handleSignupForm(e)}
            {...inputStyles}
          />
          <Input
            name='password'
            type='password'
            required
            placeholder='Password'
            onChange={(e) => handleSignupForm(e)}
            {...inputStyles}
          />
          <Input
            name='confirmPassword'
            type='password'
            required
            placeholder='Confirm Password'
            onChange={(e) => handleSignupForm(e)}
            {...inputStyles}
          />

          {/* change this to a formerror */}
          {error && (
            <Text textAlign='center' color='red.500' fontSize='10pt'>
              {error}
            </Text>
          )}

          <Button
            height='36px'
            variant='auth'
            type='submit'
            isLoading={authLoading}
          >
            Sign Up
          </Button>

          <Flex fontSize='10pt'>
            <Text mr={1}>Already a redditor?</Text>
            <Text
              color='blue.500'
              fontWeight={700}
              cursor='pointer'
              textDecoration={'underline'}
              onClick={() =>
                setAuthModalState({
                  isOpen: true,
                  view: 'login',
                })
              }
            >
              Log In
            </Text>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
};

export default SignUp;
