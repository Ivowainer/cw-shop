import { Grid, Typography } from '@mui/material';

export const OrderSummary = () => {
  return (
    <Grid container>

        <Grid item xs={6}>
            <Typography>No. products</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>3 products</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{ `$${105.36}` }</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Taxes (15%)</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{ `$${35.13}` }</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }} display="flex" justifyContent="end">
            <Typography variant="subtitle2">{ `$${182.12}` }</Typography>
        </Grid>
        
    </Grid>
  )
}
