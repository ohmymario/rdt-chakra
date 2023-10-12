import { Button, Flex, HStack, Menu, MenuButton, MenuList } from '@chakra-ui/react';

// firebase
import { User as FirebaseUser } from 'firebase/auth';

// icons
import { ChevronDownIcon } from '@chakra-ui/icons';

// set modal state
import useDirectory from '@/hooks/useDirectory';
import Communities from './Communities/Communities';

// components
import DirectoryIcon from './DirectoryIcon';
import DirectoryImage from './DirectoryImage';
import DirectoryText from './DirectoryText';

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

  const {
    selectedMenuItem: { ImageURL, icon, iconColor, displayText, link },
  } = directoryState;

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton as={Button} {...menuButtonStyle} onClick={toggleMenuOpen}>
        <HStack spacing={0.5} align='center' justify={'space-between'}>
          <Flex align='center'>
            {ImageURL ? (
              <DirectoryImage ImageURL={ImageURL} displayText={displayText} />
            ) : (
              <DirectoryIcon directoryState={directoryState} />
            )}

            <DirectoryText displayText={displayText} />
          </Flex>
          <ChevronDownIcon boxSize={5} color='gray.400' />
        </HStack>
      </MenuButton>
      <MenuList fontSize='10pt'>
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default Directory;
