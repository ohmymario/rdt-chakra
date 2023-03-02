import {
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

import { BsDot, BsReddit } from 'react-icons/bs';

import { FunctionComponent } from 'react';

// change modal state
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';

interface ResetPasswordProps {}

const ResetPassword: FunctionComponent<ResetPasswordProps> = (
  props: ResetPasswordProps
) => {
  // setting between login and signup and reset password
  const setAuthModalState = useSetRecoilState(authModalState);

  const inputStyles = {
    fontSize: '10pt',
    mb: 3,
    _placeholder: {
      color: 'gray.500',
    },
    _hover: {
      bg: 'white',
      border: '1px solid',
      borderColor: 'blue.500',
    },
    _focus: {
      outline: 'white',
      bg: 'white',
      border: '1px solid',
      borderColor: 'blue.500',
    },
    bg: 'gray.50',
  };

  const authStyles = {
    color: 'blue.500',
    fontWeight: '700',
    cursor: 'pointer',
    textDecoration: 'underline',
  };

  return (
    <>
      <VStack spacing={2} align='stretch' mb={2}>
        <VStack spacing={3} textAlign='center'>
          <Icon as={BsReddit} color='brand.100' fontSize={40} />
          <Heading size='md'>Reset your password</Heading>
          <Text fontSize='sm'>
            Enter the email associated with your account and we&apos;ll send you
            a reset link.
          </Text>
        </VStack>

        <VStack spacing={4} textAlign='center' align='stretch'>
          <Input type='email' placeholder='Email' {...inputStyles} />
          <Button height='36px' variant='auth' type='submit'>
            Log In
          </Button>
        </VStack>

        <Flex
          fontSize='9pt'
          justify='center'
          alignItems='center'
          color='blue.500'
          fontSize='9pt'
        >
          <Text
            {...authStyles}
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: 'login',
              }))
            }
          >
            Login
          </Text>
          <Icon as={BsDot} />
          <Text
            {...authStyles}
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: 'signup',
              }))
            }
          >
            Sign Up
          </Text>
        </Flex>
      </VStack>
    </>
  );
};

export default ResetPassword;
