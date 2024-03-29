import { useContext, useEffect, useState } from "react";

import { GetServerSideProps } from "next";
import { getSession, signIn, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { useForm } from "react-hook-form";

import { AuthContext } from "../../context";

import { Box, Button, Chip, Grid, Link, TextField, Typography, Divider } from "@mui/material";
import { AuthLayout } from "../../components/layouts";

import { validations } from "../../utils";

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const router = useRouter();

    const { isLoggedIn } = useContext(AuthContext);

    //prettier-ignore
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [showError, setShowError] = useState(false);
    const [executeLoginBtn, setExecuteLoginBtn] = useState(false);
    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then((prov) => {
            setProviders(prov);

            console.log(prov);
        });
    }, []);

    const destination = router.query.p?.toString() || "/";
    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }

        router.replace(destination);
    }, [isLoggedIn, router]);

    const onLoginUser = async ({ email, password }: FormData) => {
        setExecuteLoginBtn(true);
        setShowError(false);

        /* const isValidLogin = await loginUser(email, password);

        if (!isValidLogin) {
            setExecuteLoginBtn(false);
            setShowError(true);

            setTimeout(() => setShowError(false), 3000);
            return;
        }

        router.replace(destination); */

        await signIn("credentials", {
            email,
            password,
        });
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
                            <Box sx={{ marginTop: "10px" }}>
                                <Chip label="Invalid email or password" color="error" className="fadeIn" sx={{ padding: "10px 0px", display: showError ? "flex" : "none" }} />
                            </Box>
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
                            <Button disabled={executeLoginBtn} type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="end">
                            <NextLink href={router.query.p ? `/auth/register?p=${destination}` : `/auth/register`} passHref>
                                <Link underline="always">
                                    <Typography>{`You don't have account?`}</Typography>
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={12} display="flex" justifyContent="end" flexDirection="column">
                            <Divider sx={{ width: "100%", mb: 2 }} />
                            {Object.values(providers).map((provider: any) => {
                                if (provider.id === "credentials") return <div key="credentials"></div>;

                                return (
                                    <Button onClick={() => signIn(provider.id)} key={provider.id} variant="outlined" fullWidth color="primary" sx={{ mb: 1 }}>
                                        {provider.name}
                                    </Button>
                                );
                            })}
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

export default LoginPage;
