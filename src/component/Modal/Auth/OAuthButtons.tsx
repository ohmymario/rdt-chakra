import { FIREBASE_ERRORS } from '@/firebase/errors';
import { Alert, AlertIcon, Button, VStack } from '@chakra-ui/react';
import { AuthError } from 'firebase/auth';
import { FunctionComponent, useState } from 'react';

import OAuthGoogle from './OAuthGoogle';

interface OAuthButtonsProps {}

const OAuthButtons: FunctionComponent<OAuthButtonsProps> = (
  props: OAuthButtonsProps
) => {
  const [oAuthError, setOAuthError] = useState<AuthError | null>(null);

  return (
    <VStack spacing={2} display='grid' direction='column' width='100%'>
      <OAuthGoogle setOAuthError={setOAuthError} />
      <Button variant='oauth'>Continue with Facebook</Button>

      {oAuthError && (
        <Alert status='error' borderRadius='xl'>
          <AlertIcon />
          {FIREBASE_ERRORS[oAuthError.message as keyof typeof FIREBASE_ERRORS]}
        </Alert>
      )}
    </VStack>
  );
};

export default OAuthButtons;
