import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

const ResetPasswordSuccess = () => {
  return (
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
        Check your email for a link to reset your password. If it doesn&apos;t appear within a few minutes, check your
        spam folder.
      </AlertDescription>
    </Alert>
  );
};

export default ResetPasswordSuccess;
