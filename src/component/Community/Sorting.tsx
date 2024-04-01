import { Button, Flex } from '@chakra-ui/react';
import { RiRocket2Fill } from 'react-icons/ri';

interface SortingProps {}

// Sort the posts based on BEST, HOT, NEW, TOP

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
};

const sortOptions = [
  {
    Text: 'Best',
    Icon: 'Best',
  },
  {
    Text: 'Hot',
    Icon: 'Hot',
  },
  {
    Text: 'New',
    Icon: 'New',
  },
  {
    Icon: 'Elipsis',
  },
];

const SortingButton = (text: string, Icon: any) => {
  return <Button>{text}</Button>;
};

const Sorting = (props: SortingProps) => {
  return (
    <Flex {...flexContainerStyles}>
      <Flex>
        <Button>Best</Button>
        <Button>Hot</Button>
        <Button>New</Button>
        <Button>Top</Button>
        <Button>Top</Button>
      </Flex>
      <Flex>
        <Button>ICON</Button>
      </Flex>
    </Flex>
  );
};

export default Sorting;
