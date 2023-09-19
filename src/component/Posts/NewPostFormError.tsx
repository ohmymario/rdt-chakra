import { Alert, AlertIcon, Text } from '@chakra-ui/react';

interface NewPostFormErrorProps {
  error: string;
}

const NewPostFormError = (props: NewPostFormErrorProps) => {
  const { error } = props;

  return (
    <Alert status='error' display='flex' justifyContent='center'>
      <AlertIcon />
      <Text>{error}</Text>
    </Alert>
  );
};

export default NewPostFormError;
