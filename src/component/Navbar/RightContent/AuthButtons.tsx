import { authModalState } from "@/atoms/authModalAtom";
import { Button, HStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useSetRecoilState } from "recoil";

interface AuthButtonsProps {}

const AuthButtons: FunctionComponent<AuthButtonsProps> = (
  props: AuthButtonsProps
) => {
  const setAuthModalState = useSetRecoilState(authModalState);

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
          setAuthModalState({
            isOpen: true,
            view: "login",
          });
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
          setAuthModalState({
            isOpen: true,
            view: "signup",
          });
        }}
      >
        Sign Up
      </Button>
    </HStack>
  );
};

export default AuthButtons;
