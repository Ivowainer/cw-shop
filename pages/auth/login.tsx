import { useState } from "react";

import NextLink from "next/link";

import { useForm } from "react-hook-form";

import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layouts";

import { validations } from "../../utils";

import { clientMainApi } from "../../api";

import { IUserLoginRes } from "../../interfaces";

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {
    //prettier-ignore
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onLoginUser = async (data: FormData) => {
        setShowError(false);

        const { email, password } = data;

        try {
            const { data } = await clientMainApi.post<IUserLoginRes>("/user/login", { email, password });
        } catch (error: any) {
            setShowError(true);

            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    };

    return (
        <AuthLayout title={"Login | CW Shop"}>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 350, padding: "10px 20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">
                                Login in
                            </Typography>
                            <Chip label="Invalid email or password" color="error" className="fadeIn" sx={{ padding: "10px 0px", display: showError ? "flex" : "none" }} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Email"
                                variant="filled"
                                fullWidth
                                {...register("email", {
                                    required: "This field is required",
                                    validate: validations.isEmail,
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="filled"
                                fullWidth
                                {...register("password", {
                                    required: "This field is required",
                                    minLength: { value: 6, message: "The password must be at least 6 characters" },
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="end">
                            <NextLink href="/auth/register" passHref>
                                <Link underline="always">
                                    <Typography>{`You don't have account?`}</Typography>
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
