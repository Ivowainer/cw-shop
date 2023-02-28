import { useState } from "react";

import NextLink from "next/link";

import { clientMainApi } from "../../api";
import { useForm } from "react-hook-form";

import { IUserLoginRes } from "../../interfaces";
import { validations } from "../../utils";

import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layouts";

type FormData = {
    email: string;
    name: string;
    password: string;
};

const RegisterPage = () => {
    //prettier-ignore
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [executeLoginBtn, setExecuteLoginBtn] = useState(false);
    const [showError, setShowError] = useState(false);

    const onRegisterForm = async ({ name, email, password }: FormData) => {
        setExecuteLoginBtn(true);
        setShowError(false);

        try {
            const { data } = await clientMainApi.post<IUserLoginRes>("/user/register", { name, email, password });

            console.log(data);

            setExecuteLoginBtn(false);
        } catch (error: any) {
            setExecuteLoginBtn(false);
            setShowError(true);

            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    };

    return (
        <AuthLayout title={"Register | CW Shop"}>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <Box sx={{ width: 350, padding: "10px 20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">
                                Sign in
                            </Typography>
                            <Box sx={{ marginTop: "10px" }}>
                                <Chip label="Mail already registered" color="error" className="fadeIn" sx={{ padding: "10px 0px", display: showError ? "flex" : "none" }} />
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Full Name"
                                variant="filled"
                                fullWidth
                                {...register("name", {
                                    required: "This field is required",
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                            <NextLink href="/auth/login" passHref>
                                <Link underline="always">
                                    <Typography>{`You already have account?`}</Typography>
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;
