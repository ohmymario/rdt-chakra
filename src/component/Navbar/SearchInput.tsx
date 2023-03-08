import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

interface SearchInputProps {
  // user: User;
}

const SearchInput: FunctionComponent<SearchInputProps> = (
  props: SearchInputProps
) => {
  return (
    <Flex flexGrow={1} alignItems='center'>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          height='100%'
          children={<SearchIcon boxSize={'5'} color='gray.500' mt='1px' />}
        />
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
