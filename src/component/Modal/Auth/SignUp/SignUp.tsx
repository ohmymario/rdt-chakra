import { authModalState } from '@/atoms/authModalAtom';
import { Alert, AlertIcon, Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { FIREBASE_ERRORS } from '@/firebase/errors';

import { auth } from '@/firebase/clientApp';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import SignUpInput from './SignUpInput';

const SignUp = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [SignupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);

  const [createUserWithEmailAndPassword, authUser, authLoading, authError] = useCreateUserWithEmailAndPassword(auth);

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

    createUserWithEmailAndPassword(email, password);
  };

  return (
    <Box mb={4} width='100%'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <VStack spacing={4} align='stretch'>
          <SignUpInput name='email' type='email' placeholder='Email' isRequired handleSignupForm={handleSignupForm} />
          <SignUpInput
            name='password'
            type='password'
            placeholder='Password'
            isRequired
            handleSignupForm={handleSignupForm}
          />
          <SignUpInput
            name='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            isRequired
            handleSignupForm={handleSignupForm}
          />

          {(error || authError) && (
            <Alert status='error' borderRadius='xl'>
              <AlertIcon />
              {error ||
                (authError?.message &&
                  FIREBASE_ERRORS.hasOwnProperty(authError.message) &&
                  FIREBASE_ERRORS[authError.message as keyof typeof FIREBASE_ERRORS])}
            </Alert>
          )}
          <Button height='36px' variant='auth' type='submit' isLoading={authLoading}>
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
