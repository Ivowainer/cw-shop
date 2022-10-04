import type { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products';

import { initialData } from '../database/products';

import { IProducts } from '../interfaces';



const Home: NextPage = () => {
  return (
    <ShopLayout title={'Home | CW Shop'} pageDescription={'Find the best products from CW Shop'}>
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>All Products</Typography>

      <ProductList products={ initialData.products as any } />
    </ShopLayout>
  )
}

export default Home
