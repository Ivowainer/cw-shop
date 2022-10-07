import Head from "next/head";

import { Box } from "@mui/material";

interface AuthLayoutProps{
    title: string;
}

export const AuthLayout = ({ title, children }: React.PropsWithChildren<AuthLayoutProps>) => {
  return (
    <>
        <Head>
            <title>{title}</title>
        </Head>

        <main>
            <Box display="flex" justifyContent="center" alignItems="center" height="calc/100vh - 200px">
                { children }
            </Box>
        </main>
    </>
  )
}
