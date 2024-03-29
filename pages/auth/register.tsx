import { useState, useContext, useEffect } from "react";

import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { AuthContext } from "../../context";

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
    const router = useRouter();
    const { registerUser, isLoggedIn } = useContext(AuthContext);

    //prettier-ignore
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [executeLoginBtn, setExecuteLoginBtn] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }

        router.replace("/");
    }, [isLoggedIn, router]);

    const destination = router.query.p?.toString() || "/";
    const onRegisterForm = async ({ name, email, password }: FormData) => {
        setExecuteLoginBtn(true);
        setShowError(false);

        const { hasError, message } = await registerUser(name, email, password);

        if (hasError) {
            setExecuteLoginBtn(false);
            setShowError(true);
            setErrorMessage(message!);

            setTimeout(() => setShowError(false), 3000);
            return;
        }

        /* router.replace(destination); */
        await signIn("credentials", { email, password });
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
                                <Chip label={errorMessage} color="error" className="fadeIn" sx={{ padding: "10px 0px", display: showError ? "flex" : "none" }} />
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
                            <Button disabled={executeLoginBtn} type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
                                Register
                            </Button>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="end">
                            <NextLink href={router.query.p ? `/auth/login?p=${destination}` : `/auth/login`} passHref>
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

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req });

    const { p = "/" } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default RegisterPage;
