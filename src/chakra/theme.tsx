import { extendTheme } from "@chakra-ui/react";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/700.css";

import { Button } from "./button";

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

  components: {
    Button,
  },
});
