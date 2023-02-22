import { extendTheme } from "@chakra-ui/react";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/700.css";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF4500",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "gray.200",
      },
    },
  },
  component: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        "with-shadow": {
          bg: "red.400",
          boxShadow: "0 0 2px 2px #efdfde",
        },
      },
    },
  },
});
