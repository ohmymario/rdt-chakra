import { Button, Flex } from '@chakra-ui/react';

interface TextSubmitProps {
  isDisabled: boolean;
  createPost: () => Promise<void>;
  loading: boolean;
}

const TextSubmit = (props: TextSubmitProps) => {
  const { isDisabled, createPost, loading } = props;

  const buttonStyles = {
    height: '34px',
    padding: '0px 30px',
  };

  return (
    <Flex justify={'flex-end'}>
      <Button {...buttonStyles} isDisabled={isDisabled} isLoading={loading} onClick={createPost}>
        Post
      </Button>
    </Flex>
  );
};

export default TextSubmit;
