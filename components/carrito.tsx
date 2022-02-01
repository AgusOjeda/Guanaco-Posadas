import React from "react";
import { ICarrito, Product } from "../product/types";
import Link from "next/link";
import {
  Box,
  Divider,
  Flex,
  Grid,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
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
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { countAllBasket, parseCurrency } from "../helper/helper";
import CheckoutWhatsapp from "./CheckoutWhatsapp";

interface Props {
  cart: ICarrito[];
  onAdd:(product: ICarrito) => void;
  onRemove:(product: ICarrito) => void;
  remove:(product: ICarrito) => void;
}

const Basket: React.FC<Props> = ({ cart, onAdd, onRemove, remove }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const text = React.useMemo(() => {
    return cart
      .reduce(
        (message, product) =>
          message.concat(
            `* ${product.title} - *x${product.quantity}* - ${parseCurrency(
              product.price,
              product.quantity
            )} *\n`
          ),
        ``
      )
      .concat(
        `\nTotal: ${parseCurrency(
          cart.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          ),
          0
        )}`
      );
  }, [cart]);
  return (
    <>
      <Flex
        padding={4}
        bottom={4}
        position="sticky"
        alignItems="center"
        justifyContent="center"
      >
        <Button ref={btnRef} colorScheme="purple" onClick={onOpen}>
          {" "}
          Completar pedido ({countAllBasket(cart)}){" "}
          {cart.length == 1 ? "producto" : "productos"}
        </Button>
      </Flex>
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
            <Text>Carro</Text>
          </DrawerHeader>

          <DrawerBody>
            {cart.map((product) => (
              <Stack key={product.id}>
                <Stack spacing={0}>
                  <Flex>
                    <Text alignItems="flex-start" padding={2}>
                      {product.title} x{product.quantity}
                    </Text>
                    <Spacer />
                    <Flex justify="space-between">
                      <IconButton
                        aria-label="Eliminar una unidad"
                        color="red"
                        variant="ghost"
                        icon={<MinusIcon />}
                        onClick={() => onRemove(product)}
                      />
                      <IconButton
                        aria-label="Agregar una unidad"
                        color="red"
                        variant="ghost"
                        icon={<AddIcon />}
                        onClick={() => onAdd(product)}
                      />
                      <IconButton
                        aria-label="Borrar completamente"
                        color="red"
                        variant="ghost"
                        icon={<DeleteIcon />}
                        onClick={() => remove(product)}
                      />
                    </Flex>
                  </Flex>
                  <Text fontSize="sm" fontWeight="500" color="green.500">
                    {parseCurrency(product.price, product.quantity)}
                  </Text>
                  <Divider />
                </Stack>
              </Stack>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Grid>
              <Divider />
              <Text
                fontSize="large"
                fontWeight="600"
                position="sticky"
                alignItems="center"
                justifyContent="center"
                padding={4}
              >
                Total:
                {parseCurrency(
                  cart.reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  ),
                  0
                )}
              </Text>
              <Divider />
              <CheckoutWhatsapp cart={cart} text={text}></CheckoutWhatsapp>
            </Grid>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Basket;
