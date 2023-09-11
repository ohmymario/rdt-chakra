import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

interface ImageUploadAlertProps {
  errorMessage: string | null;
}

const ImageUploadAlert = (props: ImageUploadAlertProps) => {
  const { errorMessage } = props;

  return (
    <Alert status='error' mb={4} justifyContent='center'>
      <AlertIcon />
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};

export default ImageUploadAlert;
