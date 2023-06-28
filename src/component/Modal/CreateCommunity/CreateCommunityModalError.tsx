import { Alert, AlertIcon } from '@chakra-ui/react';

interface CreateCommunityModalErrorProps {
  error: string;
}

const CreateCommunityModalError = (props: CreateCommunityModalErrorProps) => {
  const { error } = props;

  return (
    <Alert status='error' border={'1px solid red'} borderRadius='xl'>
      <AlertIcon />
      {error}
    </Alert>
  );
};

export default CreateCommunityModalError;
