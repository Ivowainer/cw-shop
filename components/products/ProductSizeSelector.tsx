import { ISize } from "../../interfaces";

import { Box, Button } from "@mui/material";

interface ProductSizeSelector {
    selectedSize: ISize;
    sizes: ISize[];
}

export const ProductSizeSelector = ({ selectedSize, sizes }: ProductSizeSelector) => {
  return (
    <Box>
        {sizes.map(size => (
            <Button
                key={ size }
                size='small'
                color={ selectedSize === size ? 'primary' : 'info' }
            >
                { size }
            </Button>
        ))}
    </Box>
  )
}
