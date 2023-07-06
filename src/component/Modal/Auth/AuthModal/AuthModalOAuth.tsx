import { Text } from '@chakra-ui/react';
import OAuthButtons from '../OAuthButtons';

const AuthModalOAuth = () => {
  return (
    <>
      <OAuthButtons />

      <Text color='gray.500' fontWeight='700' textTransform='uppercase'>
        Or
      </Text>
    </>
  );
};

export default AuthModalOAuth;
