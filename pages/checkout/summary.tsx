import { useContext } from "react";
import NextLink from "next/link";

import { CartContext } from "../../context";

import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils";

const SummaryPage = () => {
    const { shippingAddress, numberOfItems } = useContext(CartContext);

    if (!shippingAddress) {
        return <></>;
    }

    return (
        <ShopLayout title={"Resume Order | CW Shop"} pageDescription={"Resume Order"}>
            <Typography variant="h1" component="h1">
                Resume Order
            </Typography>

            <Grid container sx={{ mt: 2 }}>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Resume ({numberOfItems} products)</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Delivery address</Typography>
                                <NextLink href="/checkout/address" passHref>
                                    <Link variant="subtitle1" underline="always">
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>
                                {shippingAddress?.firstName} {shippingAddress?.lastName}
                            </Typography>
                            <Typography>
                                {shippingAddress?.address} {shippingAddress.address2 ?? shippingAddress.address2}
                            </Typography>
                            <Typography>
                                {shippingAddress?.city}, {shippingAddress?.zipCode}
                            </Typography>
                            <Typography>{countries.find(country => country.code == shippingAddress?.country)?.name}</Typography>
                            <Typography>{shippingAddress?.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="end">
                                <NextLink href="/cart" passHref>
                                    <Link variant="subtitle1" underline="always">
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color="secondary" className="circular-btn" fullWidth>
                                    Confirm Order
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default SummaryPage;
