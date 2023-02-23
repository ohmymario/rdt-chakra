import AuthModal from "@/component/Modal/Auth/AuthModal";
import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import AuthButtons from "./AuthButtons";

interface RightContentProps {}

const RightContent: FunctionComponent<RightContentProps> = (
  props: RightContentProps
) => {
  return (
    <>
      <Flex as="nav" justifyContent="center" alignItems="center">
        <AuthButtons />
      </Flex>
      <AuthModal />
    </>
  );
};

export default RightContent;
