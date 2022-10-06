import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';

const Custom404 = () => {
  return (
    <ShopLayout title={'Page not found | CW Shop'} pageDescription={'Nothing to show'}>
        <Box flexDirection={{ xs: 'column', sm: 'row'}} display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
            <Typography variant="h1" component="h1" fontSize={80} fontWeight={200}>404 |</Typography>
            <Typography marginLeft={2}>We did not find any page here</Typography>
        </Box>
    </ShopLayout>
  )
}

export default Custom404
