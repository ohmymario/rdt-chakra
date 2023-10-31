import { Input, Stack, Textarea } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import TextSubmit from './TextSubmit';

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
      <Input
        name='title'
        placeholder='Title'
        value={textInput.title}
        onChange={(e) => onTextChange(e)}
        {...inputStyles}
      />

      {/* OPTIONAL TEXT */}
      <Textarea
        name='body'
        placeholder='Text (optional)'
        value={textInput.body}
        onChange={(e) => onTextChange(e)}
        height='100px'
        {...inputStyles}
      />

      {/* SUBMIT BUTTON */}
      <TextSubmit isDisabled={isDisabled} handleCreatePost={handleCreatePost} loading={loading} />
    </Stack>
  );
};

export default TextInputs;
