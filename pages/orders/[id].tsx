import NextLink from 'next/link';

import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import { CardList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout title={"Resume Order 2312 | CW Shop"} pageDescription={"Resume Order"}>
        <Typography variant='h1' component='h1'>Order: ABC123</Typography>

        {/* <Chip 
            sx={{ my:2 }}
            label="Not payed"
            variant="outlined"
            color="error"
            icon={ <CreditCardOffOutlined /> }
        /> */}
        <Chip 
            sx={{ my:2 }}
            label="Order already payed"
            variant="outlined"
            color="success"
            icon={ <CreditScoreOutlined /> }
        />

        <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} sm={7}>
                <CardList/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Resume (3 products)</Typography>
                        <Divider sx={{ my: 1 }}/>

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1">Delivery address</Typography>
                            <NextLink href="/checkout/address" passHref>
                                <Link variant="subtitle1" underline="always">Edit</Link>
                            </NextLink>
                        </Box>

                        <Typography>Ivan Campos Wainer</Typography>
                        <Typography>Algun lugar</Typography>
                        <Typography>Rosario, HYA 234</Typography>
                        <Typography>Argentina</Typography>
                        <Typography>+1 2618231</Typography>

                        <Divider sx={{ my: 1 }}/>

                        <Box display="flex" justifyContent="end">
                            <NextLink href="/cart" passHref>
                                <Link variant="subtitle1" underline="always">Edit</Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                            {/* TODO */}
                            <Typography variant="h1" component="h1">Pay</Typography>
                            <Chip 
                                sx={{ my:2 }}
                                label="Order already payed"
                                variant="outlined"
                                color="success"
                                icon={ <CreditScoreOutlined /> }
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage
