import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { User as FirebaseUser } from 'firebase/auth';

import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';

import { AiOutlineEye } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';

import { BiCoinStack } from 'react-icons/bi';
import { IoSparkles } from 'react-icons/io5';

// Sign out hook
import { auth } from '@/firebase/clientApp';
import { useSignOut } from 'react-firebase-hooks/auth';

// Auth Modal
import { authModalState } from '@/atoms/authModalAtom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { communitiesState } from '@/atoms/communitiesAtom';

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
  const setAuthModalState = useSetRecoilState(authModalState);

  const resetCommuntiyState = useResetRecoilState(communitiesState);

  const handleSignOut = async () => {
    const success = await signOut();
  };

  return (
    <Menu>
      <MenuButton as={Button} {...menuButtonStyle}>
        {/* UPDATE SPACING FOR DESKTOP VIEW */}
        <HStack spacing={0.5}>
          {user ? (
            <>
              <Icon as={FaRedditSquare} fontSize={24} mr={1} />
              <VStack
                spacing={0.5}
                fontSize='8pt'
                align='flex-start'
                display={{
                  base: 'none',
                  md: 'none',
                  xl: 'flex',
                }}
              >
                <Text color='gray.600'>{user?.displayName || user.email?.split('@')[0]}</Text>
                <HStack color='gray.400' spacing={2}>
                  <HStack spacing={0.25}>
                    <Icon as={IoSparkles} color='brand.100' fontSize={12} />
                    <Text>1 Karma</Text>
                  </HStack>
                  <HStack spacing={0.25}>
                    <Icon as={BiCoinStack} color='yellow.500' fontSize={12} />
                    <Text>4.8k</Text>
                  </HStack>
                </HStack>
              </VStack>
            </>
          ) : (
            <Icon as={VscAccount} fontSize={22} />
          )}

          <ChevronDownIcon boxSize={5} color='gray.400' />
        </HStack>
      </MenuButton>
      <MenuList fontSize='10pt'>
        {user ? (
          <>
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
          </>
        ) : (
          <>
            <MenuItem>Dark Mode</MenuItem>
            <MenuItem>Help Center</MenuItem>
            <MenuItem>More DOWN</MenuItem>
            <MenuItem>Terms & Policies DOWN</MenuItem>
            <MenuItem>Advertise on Reddit</MenuItem>

            <MenuDivider />

            <MenuItem
              onClick={(e) => {
                setAuthModalState({
                  isOpen: true,
                  view: 'login',
                });
              }}
            >
              <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
              Log In / Sign Up
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
