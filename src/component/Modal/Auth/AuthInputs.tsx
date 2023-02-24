import { authModalState } from "@/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useRecoilValue } from "recoil";
import Login from "./Login";
import SignUp from "./SignUp";

interface AuthInputsProps {
  // props later :)
}

const AuthInputs: FunctionComponent<AuthInputsProps> = (
  props: AuthInputsProps
) => {
  // only need state view
  const modalState = useRecoilValue(authModalState);

  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
    </Flex>
  );
};

export default AuthInputs;
