import { useEffect, useReducer } from "react";
import Cookie from "js-cookie";

import { cartReducer, CartContext } from "./";
import { ICartProduct } from "../../interfaces";

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

const CART_INITAL_STATE: CartState = {
    isLoaded: false,
    cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
};

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITAL_STATE);

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [];
            dispatch({ type: "Cart - LoadCart from cookies | storage", payload: cookieProducts });
        } catch (error) {
            dispatch({ type: "Cart - LoadCart from cookies | storage", payload: [] });
        }
    }, []);

    useEffect(() => {
        Cookie.set("cart", JSON.stringify(state.cart));
    }, [state.cart]);

    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => (current.price + prev) * current.quantity, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1),
        };

        dispatch({ type: "Cart - Update order summary", payload: orderSummary });
    }, [state.cart]);

    const addProductTocart = (product: ICartProduct) => {
        const productInCart = state.cart.some((p) => p._id === product._id);
        if (!productInCart) return dispatch({ type: "Cart - Update products in cart", payload: [...state.cart, product] });

        const productInCartButDifferentSize = state.cart.some((p) => p._id === product._id && p.size === product.size);
        if (!productInCartButDifferentSize) return dispatch({ type: "Cart - Update products in cart", payload: [...state.cart, product] });

        // Acumular
        const updatedProducts = state.cart.map((p) => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            // Update quantity
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: "Cart - Update products in cart", payload: updatedProducts });
    };

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: "Cart - Change cart quantity", payload: product });
    };

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: "Cart - Remove product in cart", payload: product });
    };

    return (
        <CartContext.Provider
            value={{
                ...state,

                removeCartProduct,
                addProductTocart,
                updateCartQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
