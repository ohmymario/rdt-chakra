import { Textarea } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import TextSubmit from './TextSubmit';

interface TextInputsProps {
  textInput: {
    title: string;
    body: string;
  };
  loading: boolean;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  createPost: () => Promise<void>;
}

const TextInputs: FunctionComponent<TextInputsProps> = (props: TextInputsProps) => {
  const { textInput, loading, onTextChange, createPost } = props;

  const textAreaStyles = {
    fontSize: '10pt',
    borderRadius: 4,
    height: '100px',
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
    <>
      {/* OPTIONAL TEXT */}
      <Textarea
        name='body'
        placeholder='Text (optional)'
        value={textInput.body}
        onChange={(e) => onTextChange(e)}
        {...textAreaStyles}
      />

      {/* SUBMIT BUTTON */}
      <TextSubmit isDisabled={isDisabled} createPost={createPost} loading={loading} />
    </>
  );
};

export default TextInputs;
