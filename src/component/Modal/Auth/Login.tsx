import { Box, Button, Grid, Input, VStack } from "@chakra-ui/react";
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

  return (
    <Box mb={4} width="100%" border={"1px solid red"}>
      <form onSubmit={(e) => handeSubmit(e)}>
        <VStack spacing={4} align="stretch">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => handleLoginForm(e)}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleLoginForm(e)}
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
