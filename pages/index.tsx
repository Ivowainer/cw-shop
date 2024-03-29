import type { NextPage } from 'next'

import { useSession } from 'next-auth/react';

import { Typography } from '@mui/material'

import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products';
import { FullScreenLoading } from '../components/ui';

import { useProducts } from '../hooks';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title={'Home | CW Shop'} pageDescription={'Find the best products from CW Shop'}>
      <Typography variant="h1" component="h1">Store</Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>All Products</Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={ products } />}
      
    </ShopLayout>
  )
}

export default HomePage
