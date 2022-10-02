import type { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '../components/layouts'

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Home | CW Shop'} pageDescription={'Find the best products from CW Shop'}>
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h1" sx={{ mb: 1 }}>All Products</Typography>
    </ShopLayout>
  )
}

export default Home
