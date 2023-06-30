import { FIREBASE_ERRORS } from '@/firebase/errors';
import { Alert, AlertIcon, Button, Input } from '@chakra-ui/react';
import { AuthError } from 'firebase/auth';

interface ResetPasswordFormProps {
  error: AuthError | Error | undefined;
  sending: boolean;
  handlePasswordReset: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const { error, sending, handlePasswordReset, handleEmail } = props;

  return (
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
  );
};

export default ResetPasswordForm;
