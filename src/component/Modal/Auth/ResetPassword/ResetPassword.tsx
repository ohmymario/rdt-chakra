import { VStack } from '@chakra-ui/react';
import { useState } from 'react';

// firebase password reset hook
import { auth } from '@/firebase/clientApp';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import ResetPasswordForm from './ResetPasswordForm';
import ResetPasswordHeader from './ResetPasswordHeader';
import ResetPasswordRedirect from './ResetPasswordRedirect';
import ResetPasswordSuccess from './ResetPasswordSuccess';

interface ResetPasswordProps {}

const ResetPassword = (props: ResetPasswordProps) => {
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

  return (
    <>
      <VStack spacing={2} align='stretch' mb={2}>
        {success ? (
          <ResetPasswordSuccess />
        ) : (
          <VStack spacing={3} textAlign='center' mb={2}>
            <ResetPasswordHeader />

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
