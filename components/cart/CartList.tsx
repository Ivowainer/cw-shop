import { useContext } from 'react';
import NextLink from 'next/link';

import { CartContext } from '../../context/cart';

import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { initialData } from "../../database/products"
import { ItemCounter } from '../ui';
import { ICartProduct } from '../../interfaces';

const productsInCartProvisory = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface CartListProps {
    editable?: boolean;
}

export const CartList = ({ editable = false }: CartListProps) => {
    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;

        updateCartQuantity(product)
    }

    const onNewCart = (product: ICartProduct/* , cart: ICartProduct[], newCart: ICartProduct[] */) => {
        removeCartProduct(product)
    }

    return (
        <>
            {cart.map( product => (
                <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
                    <Grid item xs={3}>
                        {/* TODO: Llevar a la pagina del producto */}
                        <NextLink href={`/product/${product.slug}`} passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                        image={`/products/${product.image}`}
                                        component="img"
                                        sx={{ borderRadius: '5px' }}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display="flex" flexDirection='column'>
                            <Typography variant="body1">{ product.title }</Typography>
                            <Typography variant="body1">Size: <strong>{product.size}</strong></Typography>

                            {editable 
                                ? <ItemCounter 
                                    currentValue={product.quantity} 
                                    maxValue={ 10 } 
                                    updateQuantity={(value) => onNewCartQuantityValue(product, value)} 
                                  /> 
                                : (
                                    <Typography variant="h5">{ product.quantity } {product.quantity <= 1 ? 'products' : 'product'}</Typography>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
                        <Typography variant="subtitle1">{`$${product.price}`}</Typography>
                        
                        {editable && <Button variant="text" color="secondary" onClick={(val) => onNewCart(product)}>Remove</Button>}
                    </Grid>
                </Grid>
            ))}
        </>
    )
}
