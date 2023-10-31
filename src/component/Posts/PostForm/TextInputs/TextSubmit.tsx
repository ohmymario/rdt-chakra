import { Button, Flex } from '@chakra-ui/react';

interface TextSubmitProps {
  isDisabled: boolean;
  handleCreatePost: () => void;
  loading: boolean;
}

const TextSubmit = (props: TextSubmitProps) => {
  const { isDisabled, handleCreatePost, loading } = props;

  const buttonStyles = {
    height: '34px',
    padding: '0px 30px',
  };

  return (
    <Flex justify={'flex-end'}>
      <Button {...buttonStyles} isDisabled={isDisabled} isLoading={loading} onClick={handleCreatePost}>
        Post
      </Button>
    </Flex>
  );
};

export default TextSubmit;
