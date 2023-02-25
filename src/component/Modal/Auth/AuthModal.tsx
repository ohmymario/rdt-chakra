import { authModalState } from "@/atoms/authModalAtom";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

interface AuthModalProps {}

const AuthModal: FunctionComponent<AuthModalProps> = (
  props: AuthModalProps
) => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  return (
    <>
      <Modal isOpen={modalState.isOpen} onClose={() => handleClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack
              display="flex"
              direction="column"
              alignItems="center"
              justifyContent="center"
              width="70%"
              spacing={4}
            >
              <OAuthButtons />

              <Text color="gray.500" fontWeight="700" textTransform="uppercase">
                Or
              </Text>

              <AuthInputs />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
