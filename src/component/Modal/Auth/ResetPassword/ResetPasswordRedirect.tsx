import { AuthModalState, authModalState } from '@/atoms/authModalAtom';
import { Flex, FlexProps, Icon, Text, TextProps } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';

const wrapperStyles: FlexProps = {
  justifyContent: 'center',
  alignItems: 'center',
  color: 'blue.500',
  fontSize: '9pt',
};

const authStyles: TextProps = {
  color: 'blue.500',
  fontWeight: '700',
  cursor: 'pointer',
  textDecoration: 'underline',
};

const ResetPasswordRedirect = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleModalState = (view: AuthModalState['view']) => {
    setAuthModalState((prev) => ({ ...prev, view }));
  };

  return (
    <Flex {...wrapperStyles}>
      <Text {...authStyles} onClick={() => handleModalState('login')}>
        Login
      </Text>
      <Icon as={BsDot} />
      <Text {...authStyles} onClick={() => handleModalState('signup')}>
        Sign Up
      </Text>
    </Flex>
  );
};

export default ResetPasswordRedirect;
