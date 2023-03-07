import { useState, useEffect } from "react";

import { SessionProvider } from "next-auth/react"

import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SWRConfig } from "swr";

import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../themes";
import { AuthProvider, CartProvider, UiProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
    }, []);
    if (!showChild) {
        return <></>;
    }

    return (
        <SessionProvider>
            <SWRConfig
                value={{
                    fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
                }}
            >
                <AuthProvider>
                    <CartProvider>
                        <UiProvider>
                            <ThemeProvider theme={lightTheme}>
                                <Component {...pageProps} />
                            </ThemeProvider>
                        </UiProvider>
                    </CartProvider>
                </AuthProvider>
            </SWRConfig>
        </SessionProvider>
    );
}

export default MyApp;
