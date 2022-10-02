import Head from "next/head"

interface ShopLayoutProps{
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ShopLayout = ({ children, title, pageDescription, imageFullUrl }: React.PropsWithChildren<ShopLayoutProps>) => {
  return (
    <>
        <Head>
            <title>{ title }</title>

            <meta name="description" content={ pageDescription } />

            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />

            {imageFullUrl && (
                <meta name="og:image" content={ imageFullUrl }/>
            )}
        </Head>

        <nav>
            {/* Todo:Sidebar */}
        </nav>

        {/* Todo:Sidebar */}

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            { children }
        </main>

        <footer>
            {/* todo: CUSTOM FOOTER */}
        </footer>

    </>
  )
}
