import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

interface PostsErrorProps {
  error: Error;
}

const PostsError = (props: PostsErrorProps) => {
  const { error } = props;
  return (
    <Alert
      height='300px'
      status='error'
      borderRadius='md'
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection={'column'}
      gap={4}
    >
      <AlertIcon boxSize='65px' />
      <AlertTitle mr={2}>Oops! Something went wrong.</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
};

export default PostsError;
