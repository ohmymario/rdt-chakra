import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = (props: NavbarProps) => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px" border="1px solid red">
      <Flex>Logos</Flex>
    </Flex>
  );
};

export default Navbar;
