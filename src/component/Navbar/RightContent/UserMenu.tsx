import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  HStack,
  Flex,
  Icon,
  MenuDivider,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { User as FirebaseUser } from 'firebase/auth';

import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';

// Sign out hook
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

interface UserMenuProps {
  user: FirebaseUser | null | undefined;
}

const menuButtonStyle = {
  bg: 'none',
  color: 'gray.300',
  borderRadius: 'md',
  border: '1px solid transparent',
  height: '32px',
  pl: {
    md: 1,
    lg: 3,
  },
  pr: {
    md: 0.25,
    lg: 2,
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

const UserMenu: FunctionComponent<UserMenuProps> = (props: UserMenuProps) => {
  const { user } = props;
  const [signOut, loading, error] = useSignOut(auth);

  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      alert('You are signed out');
    }
  };

  return (
    <Menu>
      <MenuButton as={Button} {...menuButtonStyle}>
        <HStack spacing={0.5}>
          {user ? (
            <Icon as={FaRedditSquare} fontSize={24} />
          ) : (
            <Icon as={VscAccount} fontSize={22} />
          )}

          <ChevronDownIcon boxSize={5} color='gray.400' />
        </HStack>
      </MenuButton>
      <MenuList fontSize='10pt'>
        <Flex align='center' gap={2} pl='3' mb={2} color='gray.500'>
          <Icon as={CgProfile} fontSize={20} />
          My Stuff
        </Flex>
        <MenuItem>Online Status</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Create Avatar</MenuItem>
        <MenuItem>User Settings</MenuItem>

        <MenuDivider />

        <Flex align='center' gap={2} pl='3' mb={2} color='gray.500'>
          <Icon as={AiOutlineEye} fontSize={20} />
          View Options
        </Flex>
        <MenuItem>Dark Mode</MenuItem>

        <MenuDivider />

        <MenuItem>Create a Community</MenuItem>
        <MenuItem>Advertise of Reddit</MenuItem>
        <MenuItem>Coins</MenuItem>
        <MenuItem>Premium</MenuItem>
        <MenuItem>Help Center</MenuItem>

        <MenuDivider />

        <MenuItem onClick={() => handleSignOut()}>
          <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
          Log Out
        </MenuItem>

        {/* SIGNEDOUT */}
        {/* Dark Mode on a Toggle */}
        {/* Help Center */}
        {/* More */}
        {/* Terms & Policies */}
        {/* Advertise on Reddit */}

        {/* Horizontal Line */}

        {/* Log In / Sign Up */}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
