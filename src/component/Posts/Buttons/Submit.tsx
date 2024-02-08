import { Button, Flex } from '@chakra-ui/react';

interface SubmitProps {
  isDisabled: boolean;
  loading: boolean;
  createPost: () => Promise<void>;
}

const Submit = (props: SubmitProps) => {
  const { isDisabled, createPost, loading } = props;

  const buttonStyles = {
    _hover: isDisabled
      ? {
          backgroundColor: 'gray.300',
          borderColor: 'gray.300',
        }
      : {
          backgroundColor: 'gray.300',
          borderColor: 'gray.300',
        },
  };

  return (
    <Flex justify={'flex-end'}>
      <Button {...buttonStyles} isDisabled={isDisabled} isLoading={loading} onClick={createPost} variant='postSolid'>
        Post
      </Button>
    </Flex>
  );
};

export default Submit;
