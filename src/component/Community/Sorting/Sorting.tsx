import { Flex } from '@chakra-ui/react';

// React Icons
import { FaThList } from 'react-icons/fa';

// Components
import SortingButton from './SortingButton';
import sortOptions from './SortOptions';

interface SortingProps {}

const flexContainerStyles = {
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  bg: 'white',
  height: '56px',
  borderRadius: 4,
  border: '1px solid',
  borderColor: 'gray.300',
  p: 2,
  mb: 4,
  width: '100%',
};

const Sorting = (props: SortingProps) => {
  return (
    <Flex {...flexContainerStyles} gap={1} justifyContent='space-between'>
      <Flex gap={1}>
        {sortOptions.map((option, index) => {
          return <SortingButton key={index} option={option} />;
        })}
      </Flex>

      <SortingButton option={{ Icon: FaThList }} />
    </Flex>
  );
};

export default Sorting;
