import { Button, HStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface AuthButtonsProps {}

const AuthButtons: FunctionComponent<AuthButtonsProps> = (
  props: AuthButtonsProps
) => {
  return (
    <HStack spacing={2} align="center">
      {/* // give me styles that look like reddit buttons */}
      <Button
        variant="outline"
        height="28px"
        display={{
          base: "none",
          sm: "flex",
        }}
        width={{
          base: "70px",
          sm: "110px",
        }}
        onClick={(e) => {
          console.log(`🚀 ~ e:`, e);
          console.log("clicked login");
        }}
      >
        Log In
      </Button>
      <Button
        variant="solid"
        height="28px"
        display={{
          base: "none",
          sm: "flex",
        }}
        width={{
          base: "70px",
          sm: "110px",
        }}
        onClick={(e) => {
          console.log(`🚀 ~ e:`, e);
          console.log("clicked sign up");
        }}
      >
        Sign Up
      </Button>
    </HStack>
  );
};

export default AuthButtons;
