import { auth } from '@/firebase/clientApp';
import { Flex, Image } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Directory from './Directory/Directory';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = (props: NavbarProps) => {
  const [user, loading, error] = useAuthState(auth);

  if (user) {
    console.log(`🚀 ~ user:`, user);
  }

  return (
    <Flex
      as='header'
      bg='white'
      height='48px'
      padding='6px 20px 6px 20px'
      gap={2}
      justify={{
        md: 'space-between',
      }}
    >
      {/* Needs to be a link */}
      <Flex align='center'>
        <Image src='/images/redditFace.svg' alt='logo' height='30px' />
        <Image
          src='/images/redditText.svg'
          alt='logo'
          height='40px'
          display={{
            base: 'none',
            md: 'none',
            lg: 'block',
          }}
        />
      </Flex>
      {user && <Directory user={user} />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
