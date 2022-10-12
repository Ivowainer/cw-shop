import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { SWRConfig } from 'swr'

import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../themes';
import { UiProvider } from '../context';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <UiProvider>
        <ThemeProvider theme={lightTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </SWRConfig>
  )
}

export default MyApp
