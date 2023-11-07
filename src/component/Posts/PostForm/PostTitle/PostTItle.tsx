import { Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

interface PostTItleProps {}

const PostTItle = (props: PostTItleProps) => {
  return (
    <InputGroup>
      <Input
        name='title'
        placeholder='Title'
        value={textInput.title}
        onChange={onTextChange}
        {...inputStyles}
        {...titleInputStyles}
      />
      <InputRightElement width='4.5rem'>
        <Text fontSize='sm' color='gray.500'>
          {`${textInput.title.length}/${300}`}
        </Text>
      </InputRightElement>
    </InputGroup>
  );
};

export default PostTItle;
