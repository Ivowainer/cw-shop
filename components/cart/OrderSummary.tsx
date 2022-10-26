import { useContext } from 'react';

import { Grid, Typography } from '@mui/material';

import { CartContext } from '../../context';

import { currency } from '../../utils'

export const OrderSummary = () => {
    const { numberOfItems, subTotal, total, tax } = useContext(CartContext)

    return (
        <Grid container>

            <Grid item xs={6}>
                <Typography>No. products</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{ numberOfItems } { numberOfItems > 1 ? 'products': 'product'}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{currency.format(subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Taxes ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{currency.format(tax)}</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt:2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt:2 }} display="flex" justifyContent="end">
                <Typography variant="subtitle2">{currency.format(Number(total.toFixed(2)))}</Typography>
            </Grid>
            
        </Grid>
    )
}
