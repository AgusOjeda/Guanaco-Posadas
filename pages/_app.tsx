import React from "react";
import {
  ChakraProvider,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  Box,
  Divider,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          borderRadius="sm"
          backgroundColor="white"
          boxShadow="md"
          marginY={4}
          maxWidth="container.xl"
          padding={4}
        >
          <VStack marginBottom={6}>
            <Image maxWidth={128} borderRadius={20} src="https://res.cloudinary.com/dywphbg73/image/upload/v1643173989/guanacoposadas/logo_yogfat.jpg"></Image>
            <Heading>Guanaco Posadas</Heading>
            <Text>- Accesorios bazar y regalos -</Text>
          </VStack>
          <Divider marginY={6}></Divider>
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
