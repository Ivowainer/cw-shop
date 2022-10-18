import type { NextPage, GetServerSideProps } from 'next'

import { Box, Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'

import { dbProducts } from '../../database';

import { IProducts } from '../../interfaces';
import { ProductList } from '../../components/products';

interface SearchPageProps{
    products: IProducts[];
    foundProducts: boolean;
    query: string;
}

const SearchPage = ({ products, foundProducts, query }: SearchPageProps) => {


    return (
        <ShopLayout title={'Search | CW Shop'} pageDescription={'Find the best products from CW Shop'}>
            <Typography variant="h1" component="h1">Search products</Typography>

            {foundProducts 
                ? <Typography variant="h2" sx={{ mb: 1 }} color="secondary" textTransform="uppercase">{ query }</Typography>
                : (
                    <Box display='flex'>
                        <Typography variant="h6" sx={{ mb: 1 }}>There is no product or brand with that name:</Typography>
                        <Typography variant="h6" sx={{ ml: 1 }} color="secondary">{query}</Typography>
                    </Box>
                )}

        

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
    const foundProducts = products.length > 0

    if(!foundProducts){
        products = await dbProducts.getAllProducts()
    }

    return {
        props: {
            products,
            foundProducts,
            query,
        }
    }
}

export default SearchPage
