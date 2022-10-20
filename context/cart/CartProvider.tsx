import { useReducer } from 'react';
import { cartReducer, CartContext } from './';
import { ICartProduct } from '../../interfaces';

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITAL_STATE: CartState = {
    cart: [],
}

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITAL_STATE)

    const addProductTocart = ( product: ICartProduct ) => {

    }

    return (
        <CartContext.Provider value={{ 
            ...state,

            addProductTocart
         }}>
            { children }
        </CartContext.Provider>
    )
}