export interface Product {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    image2: string;
    price: number
}

export interface ICarrito {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }