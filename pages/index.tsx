import { Button, Grid, Stack, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
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

  return (
    <Stack>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr)">
        {products.map((product) => (
          <Stack
            borderRadius="md"
            padding={4}
            key={product.id}
            backgroundColor="gray.100"
            spacing={3}
          >
            <Stack spacing={1}>
              <Text>{product.title}</Text>
              <Text fontSize="sm" fontWeight="50" color="green.500">
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
        <Link
          href={`https://wa.me/5491122525938?text=${encodeURIComponent(text)}`}
        >
          <Button colorScheme="whatsapp">
            {" "}
            Completar pedido ({cart.length}) {cart.length==1? 'producto': 'productos'}
          </Button>
        </Link>
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
