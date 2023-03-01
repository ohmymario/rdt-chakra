import { Button, Image } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

// firebase hooks google
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { AuthError } from 'firebase/auth';

interface OAuthGoogleProps {
  setOAuthError: (error: AuthError) => void;
}

const OAuthGoogle: FunctionComponent<OAuthGoogleProps> = (
  props: OAuthGoogleProps
) => {
  const { setOAuthError } = props;
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleGoogleAuth = () => {
    signInWithGoogle();
  };

  if (error) setOAuthError(error);

  return (
    <>
      <Button
        variant='oauth'
        isLoading={loading}
        onClick={() => handleGoogleAuth()}
      >
        <Image
          src='/images/googlelogo.png'
          alt='google logo'
          width='20px'
          height='20px'
          mr={2}
        />
        Continue with Google
      </Button>
    </>
  );
};

export default OAuthGoogle;
