import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { CartContext } from "../../context";

import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";

const CartPage = () => {
    const router = useRouter();
    const { isLoaded, cart } = useContext(CartContext);

    useEffect(() => {
        if (isLoaded && cart.length == 0) {
            router.replace("/cart/empty");
        }
    }, [isLoaded, cart, router]);

    if (!isLoaded) {
        return <></>;
    }

    return (
        <ShopLayout title={"Cart | CW Shop"} pageDescription={"Store shopping cart"}>
            <Typography variant="h1" component="h1">
                Cart
            </Typography>

            <Grid container sx={{ mt: 2 }}>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Order</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button href="/checkout/address" color="secondary" className="circular-btn" fullWidth>
                                    Checkout
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default CartPage;
