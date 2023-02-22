// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../chakra/theme";
import Layout from "@/component/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Provides the Chakra theme to all components
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
