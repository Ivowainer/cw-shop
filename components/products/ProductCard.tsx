import { Card, CardActionArea, CardMedia, Grid } from "@mui/material"
import { IProducts } from "../../interfaces";

interface ProductCardProps {
  product: IProducts;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Grid item xs={6} sm={4} key={product.slug}>
      <Card>
        <CardActionArea>
          <CardMedia 
            component="img"
            image={`products/${product.images[0]}`}
            alt={product.title}
          />
        </CardActionArea>
      </Card>
    </Grid>
  )
}
