import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { countAllBasket } from "../helper/helper";
import { ICarrito, Product } from "../product/types";

interface Props {
    cart: ICarrito[];
    text: string;
  }
  
  const CheckoutWhatsapp: React.FC<Props> = ({cart, text}) => {
    return (
      <>
        <Link
          href={`https://wa.me/5491122525938?text=${encodeURIComponent(text)}`}
        >
          <Flex
            position="sticky"
            alignItems="center"
            justifyContent="center"
          >
            <Button colorScheme="whatsapp">
              {" "}
              Completar pedido ({countAllBasket(cart)}){" "}
              {cart.length == 1 ? "producto" : "productos"}
            </Button>
          </Flex>
        </Link>
      </>
    );
  };

export default CheckoutWhatsapp