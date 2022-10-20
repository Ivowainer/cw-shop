import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { IProducts, ICartProduct } from "../../interfaces";

interface ItemCounterProps {
  currentValue: number;
  maxValue: number;

  updateQuantity: (quantity: number) => void;
}

export const ItemCounter = ({ updateQuantity, currentValue, maxValue }: ItemCounterProps) => {
  const addOrRemove = (value: number) => {
    if(value === -1){
      if( currentValue === 1 ) return;

      return updateQuantity(currentValue - 1)
    }

    if(currentValue >= maxValue ) return;

    updateQuantity(currentValue + 1)
  }

  return (
    <Box display="flex" alignItems="center">
        <IconButton 
          onClick={() => addOrRemove(-1)}
          disabled={currentValue <= 1}
          >
          <RemoveCircleOutline />
        </IconButton>

        <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>

        <IconButton
          onClick={() => addOrRemove(+1)}
          disabled={currentValue >= maxValue}
        >
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}
