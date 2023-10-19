import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { User as FirebaseUser } from 'firebase/auth';

interface SearchInputProps {
  user: FirebaseUser | null | undefined;
}

const SearchInput: FunctionComponent<SearchInputProps> = (props: SearchInputProps) => {
  const { user } = props;
  return (
    <Flex flexGrow={1} maxWidth={user ? 'auto' : '656px'} alignItems='center'>
      <InputGroup>
        <InputLeftElement pointerEvents='none' height='100%'>
          <SearchIcon boxSize={'5'} color='gray.500' mt='1px' />
        </InputLeftElement>
        <Input
          placeholder='Search Reddit'
          fontSize='10pt'
          height='34px'
          bg={'gray.50'}
          borderRadius='3xl'
          _placeholder={{
            color: 'gray.500',
          }}
          _hover={{
            bg: 'white',
            border: '1px solid',
            borderColor: 'blue.500',
          }}
          _focus={{
            outline: 'none',
            border: '1px solid',
            borderColor: 'blue.500',
          }}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
