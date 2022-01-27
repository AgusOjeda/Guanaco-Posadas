import React from "react";
import { Product } from "../product/types";
import Link from "next/link";
import { Box, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { parseCurrency } from "../helper/helper";
import CheckoutWhatsapp from "./CheckoutWhatsapp";

interface Props {
  cart: Product[];
}

const Carrito: React.FC<Props> = ({ cart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const text = React.useMemo(() => {
    return cart
      .reduce(
        (message, product) =>
          message.concat(
            `* ${product.title} - ${parseCurrency(product.price)}*\n`
          ),
        ``
      )
      .concat(
        `\nTotal: ${parseCurrency(
          cart.reduce((total, product) => total + product.price, 0)
        )}`
      );
  }, [cart]);
  console.log(cart);
  return (
    <Flex
      padding={4}
      bottom={4}
      position="sticky"
      alignItems="center"
      justifyContent="center"
    >
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        {" "}
        Completar pedido ({cart.length}){" "}
        {cart.length == 1 ? "producto" : "productos"}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text>Carrito</Text>
          </DrawerHeader>

          <DrawerBody>
            {cart.map((product) => (
              <Stack key={product.id}>
                <Stack spacing={1}>
                  <Text>{product.title}</Text>
                  <Text fontSize="sm" fontWeight="500" color="green.500">
                    {parseCurrency(product.price)}
                  </Text>
                </Stack>
              </Stack>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <CheckoutWhatsapp cart={cart} text={text}></CheckoutWhatsapp>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Carrito;
