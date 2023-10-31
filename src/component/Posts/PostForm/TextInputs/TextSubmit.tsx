import { Button, Flex } from '@chakra-ui/react';

interface TextSubmitProps {
  textInput: {
    title: string;
    body: string;
  };
  handleCreatePost: () => void;
  loading: boolean;
}

const TextSubmit = (props: TextSubmitProps) => {
  const { textInput, handleCreatePost, loading } = props;

  const isDisabled = textInput.title === '' || textInput.body === '';

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
