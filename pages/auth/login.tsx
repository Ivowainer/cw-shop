import NextLink from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";

import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layouts";

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {
    //prettier-ignore
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = (data: FormData) => {
        console.log(data);
    };

    return (
        <AuthLayout title={"Login | CW Shop"}>
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{ width: 350, padding: "10px 20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">
                                Login in
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField type="email" label="Email" variant="filled" fullWidth {...register("email")} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Password" type="password" variant="filled" fullWidth {...register("password")} />
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
