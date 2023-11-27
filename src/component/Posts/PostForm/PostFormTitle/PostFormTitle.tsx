import { Input, InputGroup, InputProps, InputRightElement, Text, TextProps } from '@chakra-ui/react';
import { inputType } from '../../NewPostForm';

interface PostFormTitleProps {
  textInput: inputType;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const titleStyles: InputProps = {
  fontSize: '10pt',
  borderRadius: 4,
  pr: '4.5rem',
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

const titleLengthStyles: TextProps = {
  fontSize: 'sm',
  color: 'gray.500',
};

const PostFormTitle = (props: PostFormTitleProps) => {
  const { textInput, onTextChange } = props;

  if (textInput.title.length === 300) {
    titleLengthStyles.color = 'red.500';
  } else {
    titleLengthStyles.color = 'gray.500';
  }

  return (
    <InputGroup>
      <Input name='title' placeholder='Title' value={textInput.title} {...titleStyles} onChange={onTextChange} />

      {/* Length Counter */}
      <InputRightElement width='4.5rem'>
        <Text {...titleLengthStyles}>{`${textInput.title.length}/${300}`}</Text>
      </InputRightElement>
    </InputGroup>
  );
};

export default PostFormTitle;
