// React & Next.js core
import { Button, Flex, HStack, Menu, MenuButton, MenuList } from '@chakra-ui/react';

// Icons
import { ChevronDownIcon } from '@chakra-ui/icons';

// Custom Hooks
import useDirectory from '@/hooks/useDirectory';

// Sub-components
import Communities from './Communities/Communities';
import DirectoryIcon from './DirectoryIcon';
import DirectoryImage from './DirectoryImage';
import DirectoryText from './DirectoryText';

// User/Auth
import { User as FirebaseUser } from 'firebase/auth';

interface DirectoryProps {
  user: FirebaseUser | null | undefined;
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

const Directory = (props: DirectoryProps) => {
  const { directoryState, toggleMenuOpen } = useDirectory();
  const { user } = props;

  const {
    selectedMenuItem: { ImageURL, icon, iconColor, displayText, link },
  } = directoryState;

  if (!user) return null;

  return (
    <Menu isOpen={directoryState.isOpen}>
      {/* BUTTON AND CURRENT COMMUNITY */}
      <MenuButton as={Button} {...menuButtonStyle} onClick={toggleMenuOpen}>
        <HStack spacing={0.5} align='center' justify={'space-between'}>
          <Flex align='center'>
            {ImageURL && <DirectoryImage ImageURL={ImageURL} displayText={displayText} />}
            {!ImageURL && <DirectoryIcon icon={icon} iconColor={iconColor} />}
            <DirectoryText displayText={displayText} />
          </Flex>
          <ChevronDownIcon boxSize={5} color='gray.400' />
        </HStack>
      </MenuButton>

      {/* DROPDOWN */}
      <MenuList fontSize='10pt'>
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default Directory;
