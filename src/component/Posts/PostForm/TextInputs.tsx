import { Stack, Input, Flex, Textarea, Button } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';

interface TextInputsProps {
  textInput: {
    title: string;
    body: string;
  };
  onTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCreatePost: () => void;
  loading: boolean;
}

const TextInputs: FunctionComponent<TextInputsProps> = (props: TextInputsProps) => {
  const { textInput, onTextChange, handleCreatePost, loading } = props;
  const { title, body } = textInput;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setTitle(e.target.value);
    console.log(e.target.value);
  };

  const inputStyles = {
    fontSize: '10pt',
    borderRadius: 4,
    _placeholder: {
      color: 'gray.500',
    },
    _focus: {
      outline: 'none',
      bg: 'white',
      border: '1px solid',
      borderColor: 'black',
    },
  };

  return (
    <Stack spacing={3} width='100%'>
      <Input name='Title' placeholder='Title' {...inputStyles} />
      <Textarea name='body' placeholder='Text (optional)' height='100px' {...inputStyles} />
      <Flex justify={'flex-end'}>
        <Button
          height='34px'
          padding='0px 30px'
          disabled={false}
          onClick={() => {
            console.log('submitting post');
          }}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInputs;
