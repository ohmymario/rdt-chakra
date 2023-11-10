import { Input, InputGroup, InputProps, InputRightElement, Text } from '@chakra-ui/react';
import { inputType } from '../../NewPostForm';

interface PostTItleProps {
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

const PostTItle = (props: PostTItleProps) => {
  const { textInput, onTextChange } = props;

  return (
    <InputGroup>
      <Input name='title' placeholder='Title' value={textInput.title} onChange={onTextChange} {...titleStyles} />
      <InputRightElement width='4.5rem'>
        <Text fontSize='sm' color='gray.500'>
          {`${textInput.title.length}/${300}`}
        </Text>
      </InputRightElement>
    </InputGroup>
  );
};

export default PostTItle;
