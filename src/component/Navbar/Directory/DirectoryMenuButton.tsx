// React & Next.js core
import { MenuButton, Button, HStack, Flex } from '@chakra-ui/react';

// Sub-Components
import DirectoryIcon from './DirectoryIcon';
import DirectoryImage from './DirectoryImage';
import DirectoryText from './DirectoryText';

// Atoms
import { DirectoryMenuItem } from '@/atoms/directoryMenuAtom';

// Icons
import { ChevronDownIcon } from '@chakra-ui/icons';

interface DirectoryMenuButtonProps {
  selectedMenuItem: DirectoryMenuItem;
  toggleMenuOpen: () => void;
}

const menuButtonStyle = {
  bg: 'none',
  color: 'gray.700',
  borderRadius: 'md',
  border: '1px solid transparent',
  height: '36px',
  pl: {
    md: 1,
    lg: 3,
  },
  pr: {
    md: 0.25,
    lg: 2,
  },
  minWidth: {
    base: 'auto',
    lg: '260px',
  },
  _hover: {
    bg: 'none',
    borderColor: 'gray.300',
  },
  _active: {
    bg: 'none',
    borderColor: 'gray.300',
  },
  _focus: {
    bg: 'none',
    borderColor: 'gray.300',
  },
};

const DirectoryMenuButton = (props: DirectoryMenuButtonProps) => {
  const { selectedMenuItem, toggleMenuOpen } = props;
  const { displayText, icon, iconColor, ImageURL } = selectedMenuItem;

  return (
    <MenuButton as={Button} {...menuButtonStyle} onClick={toggleMenuOpen}>
      <HStack spacing={0.5} align='center' justify={'space-between'}>
        {/* Community Image or Icon */}
        <Flex align='center'>
          {ImageURL && <DirectoryImage ImageURL={ImageURL} displayText={displayText} />}
          {!ImageURL && <DirectoryIcon icon={icon} iconColor={iconColor} />}
          <DirectoryText displayText={displayText} />
        </Flex>

        {/* Chevron */}
        <ChevronDownIcon boxSize={5} color='gray.400' />
      </HStack>
    </MenuButton>
  );
};

export default DirectoryMenuButton;
