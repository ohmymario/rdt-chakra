import { auth } from '@/firebase/clientApp';
import { Button, Flex, FlexProps, Icon, Stack, Text } from '@chakra-ui/react';

import { authModalState } from '@/atoms/authModalAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';

interface PersonalHomeProps {}

const flexWrapperStyles: FlexProps = {
  direction: 'column',
  bg: 'white',
  borderRadius: 4,
  cursor: 'pointer',
  p: '12px',
  border: '1px solid',
  borderColor: 'gray.300',
  position: 'sticky',
};

const flexInnerStyles: FlexProps = {
  align: 'flex-end',
  color: 'white',
  p: '6px 10px',
  bg: 'blue.500',
  height: '34px',
  borderRadius: '4px 4px 0px 0px',
  fontWeight: 600,
  bgImage: 'url(/images/redditPersonalHome.png)',
  backgroundSize: 'cover',
};

const PersonalHome = (props: PersonalHomeProps) => {
  // grab the user from the store and check if they are signed in
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleCreatePost = () => {
    if (!user) {
      setAuthModalState({
        isOpen: true,
        view: 'login',
      });
    }

    if (user) {
      alert('OPEN DIRECTORY MENU');
    }
  };

  const handleCreateCommunity = () => {
    if (!user) {
      setAuthModalState({
        isOpen: true,
        view: 'login',
      });
    }

    if (user) {
      alert('OPEN CREATE COMMUNITY MODAL');
    }
  };

  return (
    <Flex {...flexWrapperStyles}>
      <Flex {...flexInnerStyles}></Flex>
      <Flex direction='column' p='12px'>
        <Flex align='center' mb={2}>
          <Icon as={FaReddit} fontSize={50} color='brand.100' mr={2} />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize='9pt'>Your personal Reddit frontpage, built for you.</Text>

          {user ? <Text fontSize='9pt'>USER FOUND</Text> : <Text fontSize='9pt'>NO USER FOUND</Text>}

          <Button height='30px' onClick={handleCreatePost}>
            Create Post
          </Button>

          <Button variant='outline' height='30px' onClick={handleCreateCommunity}>
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default PersonalHome;
