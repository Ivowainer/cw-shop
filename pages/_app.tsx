import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ThemeProvider } from '@emotion/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
