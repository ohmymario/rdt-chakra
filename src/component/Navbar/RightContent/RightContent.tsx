import AuthModal from '@/component/Modal/Auth/AuthModal/AuthModal';
import { Flex } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import AuthButtons from './AuthButtons';
import UserMenu from './UserMenu';

import { User as FirebaseUser } from 'firebase/auth';
import Icons from './Icons';

interface RightContentProps {
  user: FirebaseUser | null | undefined;
}

const RightContent: FunctionComponent<RightContentProps> = (props: RightContentProps) => {
  const { user } = props;
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
