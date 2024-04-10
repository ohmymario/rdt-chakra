import { Button, Flex, Icon } from '@chakra-ui/react';

// React Icons
import { IconType } from 'react-icons';
import { FaEllipsisH, FaRegSun, FaThList } from 'react-icons/fa';
import { FaArrowUpWideShort } from 'react-icons/fa6';
import { PiFlame } from 'react-icons/pi';
import { RiRocket2Fill } from 'react-icons/ri';

interface SortingProps {}

interface SortingOption {
  Text?: string;
  Icon: IconType;
}

interface SortingButtonProps {
  option: SortingOption;
}

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

const sortOptions: SortingOption[] = [
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

const SortingButton = ({ option }: SortingButtonProps) => {
  const buttonStyles = {
    height: '8',
    bg: 'none',
    color: 'gray.500',
    px: '2.5',
    _hover: { color: 'blue.500', bg: 'gray.300' },
  };

  return (
    <Button {...buttonStyles}>
      <Icon as={option.Icon} boxSize={4} mr={option.Text ? 1 : 0} />
      {option.Text}
    </Button>
  );
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
