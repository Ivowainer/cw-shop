import { useProducts } from "../../hooks"

import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"

import { ProductList } from "../../components/products"
import { FullScreenLoading } from "../../components/ui"

const MenPage = () => {
    const { products, isLoading } = useProducts('/products?gender=men')
    return (
        <ShopLayout title={'Category Men | CW Shop'} pageDescription={'Find all men products from CW Shop'}>
            <Typography variant="h1" component="h1">Tienda</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>Men products</Typography>

            {isLoading ? <FullScreenLoading /> : <ProductList products={ products } />}
        
        </ShopLayout>
    )
}

export default MenPage
