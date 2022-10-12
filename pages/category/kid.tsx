import { useProducts } from "../../hooks"

import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"

import { ProductList } from "../../components/products"
import { FullScreenLoading } from "../../components/ui"

const KidPage = () => {
    const { products, isLoading } = useProducts('/products?gender=kid')
    return (
        <ShopLayout title={'Category Kid | CW Shop'} pageDescription={'Find all kids products from CW Shop'}>
            <Typography variant="h1" component="h1">Tienda</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>Kid products</Typography>

            {isLoading ? <FullScreenLoading /> : <ProductList products={ products } />}
        
        </ShopLayout>
    )
}

export default KidPage
