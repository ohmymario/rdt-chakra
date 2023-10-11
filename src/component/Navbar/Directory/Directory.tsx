import { Button, Flex, HStack, Icon, Image, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';

// firebase
import { User as FirebaseUser } from 'firebase/auth';

// icons
import { ChevronDownIcon } from '@chakra-ui/icons';

// set modal state
import useDirectory from '@/hooks/useDirectory';
import Communities from './Communities/Communities';
import DirectoryImage from './DirectoryImage';

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

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton as={Button} {...menuButtonStyle} onClick={toggleMenuOpen}>
        <HStack spacing={0.5} align='center' justify={'space-between'}>
          <Flex align='center'>
            {directoryState.selectedMenuItem.ImageURL ? (
              <DirectoryImage directoryState={directoryState} />
            ) : (
              <Icon
                as={directoryState.selectedMenuItem.icon}
                color={directoryState.selectedMenuItem.iconColor}
                fontSize={24}
                mr={{
                  base: 1,
                  md: 2,
                }}
              />
            )}

            <Text
              pt={1}
              display={{
                base: 'none',
                md: 'none',
                lg: 'block',
              }}
              fontWeight={600}
              fontSize='10pt'
            >
              {directoryState.selectedMenuItem.displayText}
            </Text>
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
