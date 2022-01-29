import React from "react";
import { ICarrito, Product } from "../product/types";

export function parseCurrency(value: number, quantity: number): string {
  if(quantity === 0){
    value = value *1;
  }else{
    value = value * quantity;
  }
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  }

  
export function countAllBasket(cart: ICarrito[]): number{
  return cart.reduce(
    (total, product) => total + product.quantity,
    0
  )
}


