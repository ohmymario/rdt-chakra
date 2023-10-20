// Chakra UI
import { Flex } from '@chakra-ui/react';

// Auth
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

// Sub-Components
import Logo from './Logo/Logo';
import NavbarError from './NavbarError';
import Directory from './Directory/Directory';
import SearchInput from './SearchInput/SearchInput';
import RightContent from './RightContent/RightContent';

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
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
      {/* ERROR */}
      {error && <NavbarError error={error} />}

      <Logo />

      <Directory user={user} />
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
