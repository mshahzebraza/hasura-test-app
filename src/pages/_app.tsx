import apolloClient from "@/lib/apolloClient";
import "@/styles/globals.css";
import theme from "@/styles/theme";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={apolloClient}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </ApolloProvider>

}