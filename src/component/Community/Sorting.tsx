import { Button, Flex, Icon } from '@chakra-ui/react';
import { RiRocket2Fill } from 'react-icons/ri';
import { PiFlame } from 'react-icons/pi';
import { FaRegSun } from 'react-icons/fa';
import { FaArrowUpWideShort } from 'react-icons/fa6';
import { FaEllipsisH } from 'react-icons/fa';

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
    Icon: RiRocket2Fill,
  },
  {
    Text: 'Hot',
    Icon: PiFlame,
  },
  {
    Text: 'New',
    Icon: FaRegSun,
  },
  {
    Text: 'Top',
    Icon: FaArrowUpWideShort,
  },
  {
    Icon: FaEllipsisH,
  },
];

// button will be used soon
const SortingButton = (text: string, Icon: any) => {
  return <Button>{text}</Button>;
};

const Sorting = (props: SortingProps) => {
  return (
    <Flex {...flexContainerStyles}>
      <Flex gap={1}>
        {sortOptions.map((option, index) => {
          return (
            <Button
              key={index}
              height={8}
              bg={'none'}
              color='gray.500'
              px={2.5}
              _hover={{ color: 'blue.500', bg: 'gray.300' }}
            >
              <Icon as={option.Icon} boxSize={4} mr={1} />

              {option.Text}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Sorting;
