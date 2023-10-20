// React & Next.js core
import { Flex, Input, InputGroup } from '@chakra-ui/react';

// Auth
import { User as FirebaseUser } from 'firebase/auth';

// Sub-Components
import SearchInputIcon from './SearchInputIcon';

interface SearchInputProps {
  user: FirebaseUser | null | undefined;
}

const inputSearchStyle = {
  placeholder: 'Search Reddit',
  height: '34px',
  fontSize: '10pt',
  pl: 10,
  bg: 'gray.50',
  borderRadius: '3xl',
  _placeholder: {
    color: 'gray.500',
  },
  _hover: {
    bg: 'white',
    border: '1px solid',
    borderColor: 'blue.500',
  },
  _focus: {
    outline: 'none',
    border: '1px solid',
    borderColor: 'blue.500',
  },
};

const SearchInput = (props: SearchInputProps) => {
  const { user } = props;
  return (
    <Flex flexGrow={1} maxWidth={user ? 'auto' : '656px'} alignItems='center'>
      <InputGroup>
        <SearchInputIcon />
        <Input {...inputSearchStyle} />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
