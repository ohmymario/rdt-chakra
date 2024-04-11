import { Flex, Icon, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useSetRecoilState } from 'recoil';

// Icons
import { BsLink45Deg } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import { IoImageOutline } from 'react-icons/io5';

// firebase
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

// Atoms
import { authModalState } from '@/atoms/authModalAtom';

// Hooks
import useDirectory from '@/hooks/useDirectory';

const flexContainerStyles = {
  flex: 1,
  justifyContent: 'space-evenly',
  alignItems: 'center',
  bg: 'white',
  height: '56px',
  borderRadius: 4,
  border: '1px solid',
  borderColor: 'gray.300',
  p: 2,
};

const inputStyles = {
  placeholder: 'Create Post',
  fontSize: '10pt',
  bg: 'gray.50',
  mr: 4,
  borderColor: 'gray.200',
  borderRadius: 4,
  height: '36px',
  __placeholder: {
    bg: 'white',
    border: '1px solid',
    borderColor: 'blue.500',
  },
  __focus: {
    outline: 'none',
    bg: 'white',
    border: '1px solid',
    borderColor: 'blue.500',
  },
};

const CreatePostLink = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const { toggleMenuOpen } = useDirectory();

  const clickHandler = () => {
    const { push, query } = router;
    const { communityId } = query;

    if (!user) {
      setAuthModalState({
        isOpen: true,
        view: 'login',
      });
      return;
    }

    if (communityId) {
      push(`/r/${communityId}/submit`);
      return;
    }

    toggleMenuOpen();
  };

  return (
    <Flex {...flexContainerStyles}>
      <Icon as={FaReddit} fontSize={36} color='gray.300' mr={4} />
      <Input {...inputStyles} onClick={() => clickHandler()} />
      <Icon as={IoImageOutline} fontSize={24} mr={4} color='gray.400' cursor='pointer' />
      <Icon as={BsLink45Deg} fontSize={24} color='gray.400' cursor='pointer' />
    </Flex>
  );
};

export default CreatePostLink;
