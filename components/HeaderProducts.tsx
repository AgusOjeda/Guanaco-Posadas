import React from "react";
import {
	VStack,
	Image,
	Heading,
	Text,
	Divider,
} from "@chakra-ui/react";
interface Props {
}



const HeaderProducts: React.FC<Props> = () => {
	return (
		<>
			<VStack marginBottom={6}>
				<Image alt="logo" maxWidth={128} borderRadius={20} src="https://res.cloudinary.com/dywphbg73/image/upload/v1643173989/guanacoposadas/logo_yogfat.jpg"></Image>
				<Heading>Guanaco Posadas</Heading>
				<Text>- Accesorios bazar y regalos -</Text>
			</VStack>
			<Divider marginY={6}></Divider>
		</>
	);
};

export default HeaderProducts;