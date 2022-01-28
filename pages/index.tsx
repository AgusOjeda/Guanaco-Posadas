import { Box, Button, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Basket from "../components/carrito";
import { parseCurrency } from "../helper/helper";
import api from "../product/api";
import { ICarrito, Product } from "../product/types";

interface Props {
  products: Product[];
}

const IndexRoute: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<ICarrito[]>([]);

  function handleAddToCart(product: Product) {
    let newCartProduct: ICarrito;
    newCartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 0
    }
    const exist = cart.find((x) => x.id === newCartProduct.id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    }else{
      setCart([...cart, {...newCartProduct, quantity:1}]);

    }

  }

  return (
    <Stack spacing={6}>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        {products.map((product) => (
          <Stack
            borderRadius="md"
            padding={4}
            key={product.id}
            backgroundColor="gray.100"
            spacing={3}
          >
            <Image
              maxHeight={128}
              objectFit="cover"
              src={product.image}
            ></Image>
            <Stack spacing={1}>
              <Text>{product.title}</Text>
              <Text fontSize="sm" fontWeight="500" color="green.500">
                {parseCurrency(product.price,0)}
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
      {Boolean(cart.length) && <Basket cart={cart} />}
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await api.list();

  return {
    props: {
      products,
    },
  };
};

export default IndexRoute;
