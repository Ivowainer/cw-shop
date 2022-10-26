import { useState, useEffect } from 'react';

import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { SWRConfig } from 'swr'

import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../themes';
import { CartProvider, UiProvider } from '../context';


function MyApp({ Component, pageProps }: AppProps) {
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
    }, []);
    if (!showChild) {
        return <></>;
    }

  return (
    <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <CartProvider>
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </CartProvider>
    </SWRConfig>
  )
}

export default MyApp
