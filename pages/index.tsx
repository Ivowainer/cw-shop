import type { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products';

import { initialData } from '../database/products';

import { IProducts } from '../interfaces';
import { useProducts } from '../hooks';



const HomePage: NextPage = () => {
  

  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title={'Home | CW Shop'} pageDescription={'Find the best products from CW Shop'}>
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>All Products</Typography>

      {isLoading ? <h1>Cargando...</h1> : <ProductList products={ products } />}
      
    </ShopLayout>
  )
}

export default HomePage
