import { SearchIcon } from '@chakra-ui/icons';
import { InputLeftElement } from '@chakra-ui/react';

interface SearchInputIconProps {}

const SearchInputIcon = (props: SearchInputIconProps) => {
  return (
    <InputLeftElement pointerEvents='none' height='100%'>
      <SearchIcon boxSize={'5'} color='gray.500' mt='1px' />
    </InputLeftElement>
  );
};

export default SearchInputIcon;
