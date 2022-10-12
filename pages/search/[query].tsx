import type { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';

import { useProducts } from '../../hooks';

const SearchPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title={'Search | CW Shop'} pageDescription={'Find the best products from CW Shop'}>
      <Typography variant="h1" component="h1">Search a product</Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>ABC --- 123</Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={ products } />}
      
    </ShopLayout>
  )
}

export default SearchPage
