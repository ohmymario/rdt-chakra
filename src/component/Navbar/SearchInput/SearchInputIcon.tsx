// React & Next.js core
import { InputLeftElement } from '@chakra-ui/react';

// Icons
import { SearchIcon } from '@chakra-ui/icons';

interface SearchInputIconProps {}

const SearchInputIcon = (props: SearchInputIconProps) => {
  return (
    <InputLeftElement pointerEvents='none' height='100%'>
      <SearchIcon boxSize={'5'} color='gray.500' mt='1px' />
    </InputLeftElement>
  );
};

export default SearchInputIcon;
