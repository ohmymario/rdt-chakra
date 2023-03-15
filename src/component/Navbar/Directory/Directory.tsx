import {
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';

// firebase
import { User as FirebaseUser } from 'firebase/auth';
import { FunctionComponent } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';

// icons
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { TiHome } from 'react-icons/ti';

// set modal state
import { auth } from '@/firebase/clientApp';
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import Communities from './Communities';

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

const Directory: FunctionComponent<DirectoryProps> = (
  props: DirectoryProps
) => {
  const { user } = props;
  const [signOut, loading, error] = useSignOut(auth);

  return (
    <Menu>
      <MenuButton as={Button} {...menuButtonStyle}>
        <HStack spacing={0.5} align='center' justify={'space-between'}>
          <Flex align='center'>
            <Icon
              as={TiHome}
              fontSize={24}
              mr={{
                base: 1,
                md: 2,
              }}
            />
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
              Home
            </Text>
          </Flex>
          <ChevronDownIcon boxSize={5} color='gray.400' />
        </HStack>
      </MenuButton>
      <MenuList fontSize='10pt'>
        {/* <MenuItem>Directories</MenuItem> */}
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default Directory;
