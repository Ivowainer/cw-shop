import type { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products';

import { initialData } from '../database/products';

import { IProducts } from '../interfaces';
import useSWR from 'swr'

const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

const HomePage: NextPage = () => {
  const { data, error } = useSWR("/api/products", fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log(data)

  return (
    <ShopLayout title={'Home | CW Shop'} pageDescription={'Find the best products from CW Shop'}>
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>All Products</Typography>

      <ProductList products={ data } />
    </ShopLayout>
  )
}

export default HomePage
