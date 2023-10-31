import { Stack, Input, Flex, Textarea, Button } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

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

  const isDisabled = textInput.title === '' || textInput.body === '';

  return (
    <Stack spacing={3} width='100%'>
      <Input name='title' placeholder='Title' value={title} onChange={(e) => onTextChange(e)} {...inputStyles} />
      <Textarea
        name='body'
        placeholder='Text (optional)'
        value={body}
        onChange={(e) => onTextChange(e)}
        height='100px'
        {...inputStyles}
      />
      <Flex justify={'flex-end'}>
        <Button
          height='34px'
          padding='0px 30px'
          isDisabled={title === '' || body === ''}
          isLoading={loading}
          onClick={() => handleCreatePost()}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInputs;
