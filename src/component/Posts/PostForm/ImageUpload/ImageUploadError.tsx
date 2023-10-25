import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

interface ImageUploadErrorProps {
  errorMessage: string | null;
}

const ImageUploadError = (props: ImageUploadErrorProps) => {
  const { errorMessage } = props;

  if (errorMessage === null) return null;

  return (
    <Alert status='error' mb={4} justifyContent='center'>
      <AlertIcon />
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};

export default ImageUploadError;
