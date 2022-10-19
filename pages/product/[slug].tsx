import { useState } from "react";

import { useRouter } from "next/router";

import { useProducts } from "../../hooks";

import { Box, Button, Chip, Grid, Typography } from "@mui/material"

import { ShopLayout } from "../../components/layouts"
import { ProductSizeSelector, ProductSlideShow } from '../../components/products';
import { ItemCounter } from "../../components/ui";

import { IProducts, ICartProduct, ISize } from '../../interfaces';
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext } from "next";
import { dbProducts } from "../../database";

interface ProductPagesProps{
  product: IProducts
}

const ProductPage = ({ product }: ProductPagesProps) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const onSelectedSize = (size : ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size: size
    }))
  }


  return (
    <ShopLayout pageDescription={product.description} title={`${product.title} | CW Shop`}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">

            {/* Titlr */}
            <Typography variant="h1" component="h1">{product.title}</Typography>
            <Typography variant="subtitle1" component="h2">{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Amount</Typography>
              <ItemCounter />
              <ProductSizeSelector 
                selectedSize={tempCartProduct.size} 
                /* setSelectedSize={setSelectedSize} */
                onSelectedSize={onSelectedSize}
                sizes={product.sizes}
              />
            </Box>


            {/* Add to cart */}
            {product.inStock > 0 ? (
              <Button color="secondary" className="circular-btn">
                {tempCartProduct.size ? 'Add to cart': 'Select a size'}
              </Button>
            ) : (
              <Chip label="No stock" color="error" variant="outlined" />
            )}

            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getStaticPaths = async() => {
  const data = await dbProducts.getAllProductSlugs()

  return {
    paths: data.map(slug => ({ params: slug })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async(ctx: GetStaticPropsContext) => {
  const { slug = '' } = ctx.params as { slug: string }

  const product = await dbProducts.getProductBySlug(slug)

  if(!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage