import AuthModal from '@/component/Modal/Auth/AuthModal';
import { Flex } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import AuthButtons from './AuthButtons';
import UserMenu from './UserMenu';

import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

import { User as FirebaseUser } from 'firebase/auth';
import Icons from './Icons';

interface RightContentProps {
  user: FirebaseUser | null | undefined;
}

const RightContent: FunctionComponent<RightContentProps> = (
  props: RightContentProps
) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <AuthModal />
      <Flex as='nav' justifyContent='center' alignItems='center' gap={2}>
        {user ? (
          <>
            <Icons />
          </>
        ) : (
          <AuthButtons />
        )}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};

export default RightContent;
