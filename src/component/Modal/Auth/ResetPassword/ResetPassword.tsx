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
import ResetPasswordRedirect from './ResetPasswordRedirect';
import ResetPasswordSuccess from './ResetPasswordSuccess';

interface ResetPasswordProps {}

const ResetPassword: FunctionComponent<ResetPasswordProps> = (props: ResetPasswordProps) => {
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

  return (
    <>
      <VStack spacing={2} align='stretch' mb={2}>
        {success ? (
          <ResetPasswordSuccess />
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
        <ResetPasswordRedirect />
      </VStack>
    </>
  );
};

export default ResetPassword;
