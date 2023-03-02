import { createContext } from "react";
import type { ICartProduct } from "../../interfaces";
import type { ShippingAddress } from "./CartProvider";

interface ContextProps {
    isLoaded: boolean;

    cart: ICartProduct[];

    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress;

    addProductTocart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
