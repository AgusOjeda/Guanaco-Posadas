import { Box, Button, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Carrito from "../components/carrito";
import api from "../product/api";
import { Product } from "../product/types";

interface Props {
  products: Product[];
}

const IndexRoute: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<Product[]>([]);

  function handleAddToCart(product: Product) {
    setCart((cart) => cart.concat(product));
  }

  function parseCurrency(value: number): string {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
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
                {parseCurrency(product.price)}
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
        <Carrito cart={cart}/>
      )}
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
