import { Button, Flex, Grid, Image, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface OAuthButtonsProps {}

const OAuthButtons: FunctionComponent<OAuthButtonsProps> = (
  props: OAuthButtonsProps
) => {
  return (
    <VStack spacing={2} display="grid" direction="column" width="100%">
      <Button variant="oauth">
        <Image
          src="/images/googlelogo.png"
          alt="google logo"
          width="20px"
          height="20px"
          mr={2}
        />
        Continue with Google
      </Button>
      <Button variant="oauth">Continue with Facebook</Button>
    </VStack>
  );
};

export default OAuthButtons;
