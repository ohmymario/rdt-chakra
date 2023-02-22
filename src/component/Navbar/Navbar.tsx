import { Flex, Image } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = (props: NavbarProps) => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px" border="1px solid red">
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
      {/* <SearchInput /> */}

      {/* Show RightContent if Logged In */}
      {/* <RightContent /> */}
    </Flex>
  );
};

export default Navbar;
