import { useContext, useState } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

import { CartContext } from "../../context";

import { countries } from "../../utils";

import { useForm } from "react-hook-form";

import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";

type FormData = {
    name: string;
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    zipCode: string;
    city: string;
    country: string;
    phone: string;
};

const getAddressFromCookies = () => {
    return {
        firstName: Cookies.get("firstName") || "",
        lastName: Cookies.get("lastName") || "",
        address: Cookies.get("address") || "",
        address2: Cookies.get("address2") || "",
        zipCode: Cookies.get("zipCode") || "",
        city: Cookies.get("city") || "",
        country: Cookies.get("country") || "",
        phone: Cookies.get("phone") || "",
    };
};

const AddressPage = () => {
    const router = useRouter();

    const { updateAddress } = useContext(CartContext);

    const [executeLoginBtn, setExecuteLoginBtn] = useState(false);

    //prettier-ignore
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const onReviewOrder = (data: FormData) => {
        setExecuteLoginBtn(true);

        updateAddress(data);

        router.push("/checkout/summary");
        setExecuteLoginBtn(false);
    };

    return (
        <ShopLayout title={"Address | CW Shop"} pageDescription={"Confirm direction"}>
            <Typography variant="h1" component="h1">
                Direction
            </Typography>

            <form onSubmit={handleSubmit(onReviewOrder)}>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            variant="filled"
                            fullWidth
                            {...register("firstName", {
                                required: "This field is required",
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            variant="filled"
                            fullWidth
                            {...register("lastName", {
                                required: "This field is required",
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Direction"
                            variant="filled"
                            fullWidth
                            {...register("address", {
                                required: "This field is required",
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Direction 2 (optional)" variant="filled" fullWidth {...register("address2")} error={!!errors.address2} helperText={errors.address2?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Postal Code"
                            variant="filled"
                            fullWidth
                            {...register("zipCode", {
                                required: "This field is required",
                            })}
                            error={!!errors.zipCode}
                            helperText={errors.zipCode?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            variant="filled"
                            fullWidth
                            {...register("city", {
                                required: "This field is required",
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                variant="filled"
                                label="Country"
                                defaultValue={Cookies.get('country') || countries[0].code}
                                {...register("country", {
                                    required: "This field is required",
                                })}
                                error={!!errors.city}
                                helperText={errors.city?.message}
                            >
                                {countries.map((country, i) => (
                                    <MenuItem key={country.code} value={country.code}>
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone"
                            variant="filled"
                            fullWidth
                            {...register("phone", {
                                required: "This field is required",
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
                    <Button disabled={executeLoginBtn} type="submit" color="secondary" className="circular-btn" size="large">
                        Review order
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    );
};

/* export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { token = "" } = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken(token);
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    if (!isValidToken) {
        return {
            redirect: {
                destination: "/auth/login?p=/checkout/address",
                permanent: true,
            },
        };
    }

    return {
        props: {},
    };
}; */

export default AddressPage;
