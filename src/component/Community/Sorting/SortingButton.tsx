import { Button, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface SortingButtonProps {
  option: { Text?: string; Icon: IconType };
}

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

export default SortingButton;
