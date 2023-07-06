import { Input, InputProps } from '@chakra-ui/react';

interface LoginInputProps extends InputProps {
  name: string;
  type: string;
  handleLoginForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

const LoginInput = (props: LoginInputProps) => {
  const { name, type, handleLoginForm, ...rest } = props;
  return <Input name={name} onChange={(e) => handleLoginForm(e)} {...inputStyles} {...rest} />;
};

export default LoginInput;
