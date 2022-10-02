import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '../themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
