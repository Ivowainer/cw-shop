import { useProducts } from "../../hooks"

import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"

import { ProductList } from "../../components/products"
import { FullScreenLoading } from "../../components/ui"

const WomenPage = () => {
    const { products, isLoading } = useProducts('/products?gender=women')
    return (
        <ShopLayout title={'Category Women | CW Shop'} pageDescription={'Find all women products from CW Shop'}>
            <Typography variant="h1" component="h1">Tienda</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>Women products</Typography>

            {isLoading ? <FullScreenLoading /> : <ProductList products={ products } />}
        
        </ShopLayout>
    )
}

export default WomenPage
