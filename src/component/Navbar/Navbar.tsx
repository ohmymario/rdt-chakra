import { Flex, Image } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = (props: NavbarProps) => {
  return (
    <Flex as="header" bg="white" height="44px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" alt="logo" height="30px" />
        <Image
          src="/images/redditText.svg"
          alt="logo"
          height="40px"
          // media query
          // mobile first
          display={{
            base: "none",
            md: "unset",
          }}
        />
      </Flex>
      {/* Show Directory if Logged In */}
      {/* <Directory /> */}

      {/* Always Shown */}
      <SearchInput />

      {/* Show RightContent if Logged In */}
      <RightContent />
    </Flex>
  );
};

export default Navbar;
