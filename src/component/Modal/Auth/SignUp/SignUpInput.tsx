import { Input, InputProps } from '@chakra-ui/react';

interface SignUpInputProps extends InputProps {
  name: string;
  type: string;
  handleSignupForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const inputStyles: InputProps = {
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

const SignUpInput = (props: SignUpInputProps) => {
  const { name, type, handleSignupForm, ...rest } = props;
  return <Input name={name} type={type} onChange={(e) => handleSignupForm(e)} {...inputStyles} {...rest} />;
};

export default SignUpInput;
