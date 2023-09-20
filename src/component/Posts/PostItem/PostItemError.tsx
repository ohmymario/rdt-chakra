import { Alert, AlertIcon, Text } from '@chakra-ui/react';

interface PostItemErrorProps {
  error: string;
}

const PostItemError = (props: PostItemErrorProps) => {
  const { error } = props;

  return (
    <Alert status='error' display='flex' justifyContent='center'>
      <AlertIcon />
      <Text>{error}</Text>
    </Alert>
  );
};

export default PostItemError;
