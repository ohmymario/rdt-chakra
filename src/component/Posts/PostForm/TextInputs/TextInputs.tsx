import { Textarea } from '@chakra-ui/react';

interface TextInputsProps {
  textInput: {
    title: string;
    body: string;
  };
  errorMessage: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TextInputs = (props: TextInputsProps) => {
  const { textInput, errorMessage, handleInputChange } = props;

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

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}

      <Textarea
        name='body'
        placeholder='Text (optional)'
        value={textInput.body}
        onChange={(e) => handleInputChange(e)}
        {...textAreaStyles}
      />
    </>
  );
};

export default TextInputs;
