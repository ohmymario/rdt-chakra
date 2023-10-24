import { Alert, AlertIcon, Text } from '@chakra-ui/react';

interface NewPostFormErrorProps {
  error: string | null;
}

const NewPostFormError = (props: NewPostFormErrorProps) => {
  const { error } = props;

  if (error === null) return null;

  return (
    <Alert status='error' display='flex' justifyContent='center'>
      <AlertIcon />
      <Text>{error}</Text>
    </Alert>
  );
};

export default NewPostFormError;
