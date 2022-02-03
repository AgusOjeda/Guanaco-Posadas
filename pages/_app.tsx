import React from "react";
import {
	ChakraProvider,
	Container,
	Box,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";



const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			
			<Component {...pageProps} />
		</ChakraProvider>
	);
};

export default App;
