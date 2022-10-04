import { Grid } from "@mui/material"
import { IProducts } from "../../interfaces"
import { ProductCard } from "./ProductCard";

interface ProductListProps {
    products: IProducts[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <Grid container spacing={4}>
        {products.map(product => (
            <ProductCard 
                key={product.slug}
                product={product}
            />
        ))}
    </Grid>
  )
}
