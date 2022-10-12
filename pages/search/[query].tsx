import type { NextPage, GetServerSideProps } from 'next'

import { Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'

import { dbProducts } from '../../database';

import { IProducts } from '../../interfaces';
import { ProductList } from '../../components/products';

interface SearchPageProps{
    products: IProducts[];
}

const SearchPage = ({ products }: SearchPageProps) => {

  return (
    <ShopLayout title={'Search | CW Shop'} pageDescription={'Find the best products from CW Shop'}>
      <Typography variant="h1" component="h1">Search a product</Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>ABC --- 123</Typography>

      <ProductList products={ products } />
      
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const {query = ''} = params as { query: string };

    if(query.length === 0 ){
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query)

    //TODO: RETORNAR OTROS PRODUCTOS

    return {
        props: {
            products
        }
    }
}

export default SearchPage
