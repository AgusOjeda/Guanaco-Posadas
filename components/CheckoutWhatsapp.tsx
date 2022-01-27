import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { Product } from "../product/types";

interface Props {
    cart: Product[];
    text: string;
  }
  
  const CheckoutWhatsapp: React.FC<Props> = ({cart, text}) => {
    return (
      <>
        <Link
          href={`https://wa.me/5491122525938?text=${encodeURIComponent(text)}`}
        >
          <Flex
            padding={4}
            bottom={4}
            position="sticky"
            alignItems="center"
            justifyContent="center"
          >
            <Button colorScheme="whatsapp">
              {" "}
              Completar pedido ({cart.length}){" "}
              {cart.length == 1 ? "producto" : "productos"}
            </Button>
          </Flex>
        </Link>
      </>
    );
  };

export default CheckoutWhatsapp