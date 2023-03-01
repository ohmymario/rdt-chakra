import AuthModal from '@/component/Modal/Auth/AuthModal';
import { Button, Flex, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import AuthButtons from './AuthButtons';

import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

import { User as FirebaseUser } from 'firebase/auth';

interface RightContentProps {
  user: FirebaseUser | null | undefined;
}

const RightContent: FunctionComponent<RightContentProps> = (
  props: RightContentProps
) => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  return (
    <>
      <Flex as='nav' justifyContent='center' alignItems='center'>
        {user ? (
          <Button
            height={8}
            onClick={async () => {
              const success = await signOut();
              if (success) {
                console.log('Sign out success');
              }
            }}
          >
            Sign out
          </Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
      <AuthModal />
    </>
  );
};

export default RightContent;
