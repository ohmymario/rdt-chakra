import { authModalState } from '@/atoms/authModalAtom';
import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = (props: SignUpProps) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [SignupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignupForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({
      ...SignupForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const inputStyles = {
    fontSize: '10pt',
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

  return (
    <Box mb={4} width='100%'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <VStack spacing={4} align='stretch'>
          <Input
            name='email'
            type='email'
            placeholder='Email'
            onChange={(e) => handleSignupForm(e)}
            {...inputStyles}
          />
          <Input
            name='password'
            type='password'
            placeholder='Password'
            onChange={(e) => handleSignupForm(e)}
            {...inputStyles}
          />
          <Input
            name='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            onChange={(e) => handleSignupForm(e)}
            {...inputStyles}
          />

          <Button height='36px' variant='auth' type='submit'>
            Sign Up
          </Button>

          <Flex fontSize='10pt'>
            <Text mr={1}>Already a redditor?</Text>
            <Text
              color='blue.500'
              fontWeight={700}
              cursor='pointer'
              textDecoration={'underline'}
              onClick={() =>
                setAuthModalState({
                  isOpen: true,
                  view: 'login',
                })
              }
            >
              Log In
            </Text>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
};

export default SignUp;
