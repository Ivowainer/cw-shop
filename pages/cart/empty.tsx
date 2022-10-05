import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"

const EmptyPage = () => {
  return (
    <ShopLayout title="Cart Empty" pageDescription="No items in the cart">
        <Box flexDirection={{ xs: 'column', sm: 'row'}} display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display="flex" flexDirection='column' alignItems='center'>
                <Typography marginLeft={2}>Your cart is empty</Typography>
                <NextLink href='/' passHref>
                    <Link typography="h4" color="secondary">Back</Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
  )
}

export default EmptyPage