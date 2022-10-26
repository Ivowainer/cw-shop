import { useEffect, useReducer } from 'react';
import Cookie from 'js-cookie'

import { cartReducer, CartContext } from './';
import { ICartProduct } from '../../interfaces';

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITAL_STATE: CartState = {
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
}

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    
    const [state, dispatch] = useReducer(cartReducer, CART_INITAL_STATE)

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
            dispatch({ type: 'Cart - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: 'Cart - LoadCart from cookies | storage', payload: [] });
        }
    }, []);

    
    useEffect(() => {
      Cookie.set('cart', JSON.stringify( state.cart ));
    }, [state.cart]);

    const addProductTocart = ( product: ICartProduct ) => {
        const productInCart = state.cart.some( p => p._id === product._id )
        if( !productInCart ) return dispatch({ type: 'Cart - Update products in cart', payload: [...state.cart, product] })

        const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size)
        if( !productInCartButDifferentSize ) return dispatch({ type: 'Cart - Update products in cart', payload: [...state.cart, product] })

        // Acumular
        const updatedProducts = state.cart.map( p => {
            if(p._id !== product._id) return p;
            if(p.size !== product.size) return p;

            // Update quantity
            p.quantity += product.quantity
            return p;
        })

        dispatch({ type: 'Cart - Update products in cart', payload: updatedProducts })
    }

    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: 'Cart - Change cart quantity', payload: product })
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: 'Cart - Change cart quantity', payload: product })
    }

    return (
        <CartContext.Provider value={{ 
            ...state,

            removeCartProduct,
            addProductTocart,
            updateCartQuantity
         }}>
            { children }
        </CartContext.Provider>
    )
}