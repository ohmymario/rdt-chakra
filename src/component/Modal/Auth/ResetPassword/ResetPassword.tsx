import { Alert, AlertIcon, Button, Heading, Icon, Input, Text, VStack } from '@chakra-ui/react';
import { BsReddit } from 'react-icons/bs';
import { FunctionComponent, useState } from 'react';

// firebase password reset hook
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import ResetPasswordForm from './ResetPasswordForm';
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

            <ResetPasswordForm
              error={error}
              sending={sending}
              handlePasswordReset={handlePasswordReset}
              handleEmail={handleEmail}
            />
          </VStack>
        )}
        <ResetPasswordRedirect />
      </VStack>
    </>
  );
};

export default ResetPassword;
