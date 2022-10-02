import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '../themes';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
