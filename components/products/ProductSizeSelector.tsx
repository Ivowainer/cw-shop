import { ISize } from "../../interfaces";

import { Box, Button } from "@mui/material";

interface ProductSizeSelector {
    selectedSize?: ISize;
    sizes: ISize[];
    /* setSelectedSize: () => void; */
    /* onSelectedSize: () => void; */

    // Method
    onSelectedSize: (size: ISize) => void;
}

export const ProductSizeSelector = ({ sizes, selectedSize, onSelectedSize }: ProductSizeSelector) => {
  return (
    <Box>
        {sizes.map(size => (
            <Button
                key={ size }
                size='small'
                color={ selectedSize === size ? 'primary' : 'info' }
                onClick={() => onSelectedSize(size)}
            >
                { size }
            </Button>
        ))}
    </Box>
  )
}
