import { FunctionComponent } from 'react';
import { Flex } from '@chakra-ui/react';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import Directory from './Directory/Directory';
import Logo from './Logo';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = (props: NavbarProps) => {
  const [user, loading, error] = useAuthState(auth);

  const navbarHeaderStyle = {
    bg: 'white',
    height: '48px',
    padding: '6px 20px 6px 20px',
    gap: 2,
    justify: {
      md: 'space-between',
    },
  };

  return (
    <Flex as='header' {...navbarHeaderStyle}>
      <Logo />
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
