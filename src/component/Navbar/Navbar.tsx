import { FunctionComponent } from 'react';
import { Flex } from '@chakra-ui/react';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import Directory from './Directory/Directory';
import Logo from './Logo';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';
import NavbarError from './NavbarError';

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = (props: NavbarProps) => {
  const [
    user,
    loading,
    // error
  ] = useAuthState(auth);

  const error = new Error('There was an error loading your communities');

  const navbarHeaderStyle = {
    bg: 'white',
    height: '48px',
    padding: '6px 20px 6px 20px',
    gap: 2,
    justify: {
      md: 'space-between',
    },
  };

  // later to be set using error from useAuthState
  if (error) return <NavbarError error={error} />;

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
