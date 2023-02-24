import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = (props: LoginProps) => {
  const [LoginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...LoginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`🚀 ~ handeSubmit ~ e:`, e);
  };

  const inputStyles = {
    fontSize: "10pt",
    _placeholder: {
      color: "gray.500",
    },
    _hover: {
      bg: "white",
      border: "1px solid",
      borderColor: "blue.500",
    },
    _focus: {
      outline: "white",
      bg: "white",
      border: "1px solid",
      borderColor: "blue.500",
    },
    bg: "gray.50",
  };

  return (
    <Box mb={4} width="100%">
      <form onSubmit={(e) => handeSubmit(e)}>
        <VStack spacing={4} align="stretch">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => handleLoginForm(e)}
            {...inputStyles}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleLoginForm(e)}
            {...inputStyles}
          />

          <Button height="36px" type="submit">
            Log In
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
