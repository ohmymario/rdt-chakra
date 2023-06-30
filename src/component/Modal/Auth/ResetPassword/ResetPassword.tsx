import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

import { BsDot, BsReddit } from 'react-icons/bs';

import { FunctionComponent, useState } from 'react';

// change modal state
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';

// firebase password reset hook
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';

interface ResetPasswordProps {}

const ResetPassword: FunctionComponent<ResetPasswordProps> = (props: ResetPasswordProps) => {
  // setting between login and signup and reset password
  const setAuthModalState = useSetRecoilState(authModalState);
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

  const [email, setEmail] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userEmail = e.target.value;
    setEmail(userEmail);
  };

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    let response = await sendPasswordResetEmail(email);
    if (response) setSuccess(true);
  };

  const inputStyles = {
    fontSize: '10pt',
    mb: 3,
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

  const authStyles = {
    color: 'blue.500',
    fontWeight: '700',
    cursor: 'pointer',
    textDecoration: 'underline',
  };

  return (
    <>
      <VStack spacing={2} align='stretch' mb={2}>
        {success ? (
          <Alert
            status='success'
            borderRadius='xl'
            mb={3}
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
          >
            <AlertIcon boxSize='32px' />
            <AlertTitle mt={4} mb={3} fontSize='xl'>
              Email Sent!
            </AlertTitle>
            <AlertDescription maxWidth='sm' fontSize='md'>
              Check your email for a link to reset your password. If it doesn&apos;t appear within a few minutes, check
              your spam folder.
            </AlertDescription>
          </Alert>
        ) : (
          <VStack spacing={3} textAlign='center' mb={2}>
            <Icon alignSelf='center' as={BsReddit} color='brand.100' fontSize={40} />
            <Heading size='md'>Reset your password</Heading>
            <Text fontSize='sm'>
              Enter the email associated with your account and we&apos;ll send you a reset link.
            </Text>

            <form onSubmit={(e) => handlePasswordReset(e)}>
              {error && (
                <Alert status='error' borderRadius='xl' mb={3}>
                  <AlertIcon />
                  {FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}
                </Alert>
              )}

              <Input type='email' placeholder='Email' required onChange={(e) => handleEmail(e)} {...inputStyles} />

              <Button height='36px' variant='auth' type='submit' width={'100%'} isLoading={sending}>
                Reset Password
              </Button>
            </form>
          </VStack>
        )}
        <Flex justify='center' alignItems='center' color='blue.500' fontSize='9pt'>
          <Text
            {...authStyles}
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: 'login',
              }))
            }
          >
            Login
          </Text>
          <Icon as={BsDot} />
          <Text
            {...authStyles}
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: 'signup',
              }))
            }
          >
            Sign Up
          </Text>
        </Flex>
      </VStack>
    </>
  );
};

export default ResetPassword;
