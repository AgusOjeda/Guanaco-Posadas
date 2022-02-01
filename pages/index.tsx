import { Box, Button, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Basket from "../components/carrito";
import { parseCurrency } from "../helper/helper";
import api from "../product/api";
import { ICarrito, Product } from "../product/types";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
interface Props {
  products: Product[];
}

const IndexRoute: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<ICarrito[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string>(null);

  const handleAddToCart = (product: Product): void => {
    let newCartProduct: ICarrito;
    newCartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 0,
    };
    const exist = cart.find((x) => x.id === newCartProduct.id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...newCartProduct, quantity: 1 }]);
    }
  };

  const handleAddToCartFromBasket = (product: ICarrito): void => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleOnRemove = (product: ICarrito): void => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist.quantity === 1) {
      setCart(cart.filter((x) => x.id !== product.id)); //si el producto solo tiene un cantidad de 1, sera removido del array
    } else {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const handleRemoveFromBasket = (product: ICarrito): void => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist) setCart(cart.filter((x) => x.id !== product.id));
    else console.log("item not found");
  };

  return (
    <AnimateSharedLayout>
      <Stack spacing={6}>
        <Grid
          gridGap={6}
          templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        >
          {products.map((product) => (
            <Stack
              borderRadius="md"
              padding={4}
              key={product.id}
              backgroundColor="gray.100"
              spacing={3}
            >
              <Image
                alt={product.title}
                as={motion.img}
                cursor="pointer"
                layoutId={product.image}
                maxHeight={128}
                objectFit="cover"
                src={product.image}
                onClick={() => setSelectedImage(product.image)}
              ></Image>
              <Stack spacing={1}>
                <Text>{product.title}</Text>
                <Text fontSize="sm" fontWeight="500" color="green.500">
                  {parseCurrency(product.price, 0)}
                </Text>
              </Stack>
              <Button
                onClick={() => handleAddToCart(product)}
                colorScheme="primary"
                variant="outline"
                size="sm"
              >
                Agregar
              </Button>
            </Stack>
          ))}
        </Grid>
        {Boolean(cart.length) && (
          <Basket
            onAdd={handleAddToCartFromBasket}
            onRemove={handleOnRemove}
            remove={handleRemoveFromBasket}
            cart={cart}
          />
        )}
      </Stack>
      <AnimatePresence>
        {selectedImage && (
          <Flex
            key="backdrop"
            as={motion.div}
            alignItems="center"
            backgroundColor="rgba(0,0,0,0.5)"
            justifyContent="center"
            layoutId={selectedImage}
            position="fixed"
            top={0}
            left={0}
            height="100%"
            width="100%"
            onClick={() => setSelectedImage(null)}
          >
            <Flex>
              <Image key="image" src={selectedImage} />
            </Flex>
          </Flex>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

//MODAL

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await api.list();

  return {
    props: {
      products,
    },
  };
};

export default IndexRoute;
