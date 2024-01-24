import { Button, Flex } from '@chakra-ui/react';

interface NewPostFormSubmitProps {
  isDisabled: boolean;
  loading: boolean;
  createPost: () => Promise<void>;
}

const NewPostFormSubmit = (props: NewPostFormSubmitProps) => {
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

export default NewPostFormSubmit;
