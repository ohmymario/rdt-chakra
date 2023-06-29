import { AuthModalState } from '@/atoms/authModalAtom';
import { Flex, Text } from '@chakra-ui/react';
import { SetterOrUpdater } from 'recoil';

interface AuthSwitchProps {
  view: AuthModalState['view'];
  setAuthModalState: SetterOrUpdater<AuthModalState>;
}

const AuthSwitch = (props: AuthSwitchProps) => {
  const { view, setAuthModalState } = props;

  const viewTexts: Record<AuthModalState['view'], string> = {
    login: 'Log In',
    signup: 'Sign Up',
    resetPassword: 'Reset',
  };

  const promptTexts: Record<AuthModalState['view'], string> = {
    login: 'Already a redditor?',
    signup: 'New Here?',
    resetPassword: 'Forgot your password?',
  };

  const justifyContentStyles: Record<AuthModalState['view'], string> = {
    login: 'flex-start',
    signup: 'flex-start',
    resetPassword: 'center',
  };

  const fontSizeStyles: Record<AuthModalState['view'], string> = {
    login: '10pt',
    signup: '10pt',
    resetPassword: '9pt',
  };

  return (
    <Flex fontSize={fontSizeStyles[view]} justifyContent={justifyContentStyles[view]}>
      <Text mr={1}>{promptTexts[view]}</Text>
      <Text
        color='blue.500'
        fontWeight={700}
        cursor='pointer'
        textDecoration={'underline'}
        onClick={() =>
          setAuthModalState({
            isOpen: true,
            view: view,
          })
        }
      >
        {viewTexts[view]}
      </Text>
    </Flex>
  );
};

export default AuthSwitch;
