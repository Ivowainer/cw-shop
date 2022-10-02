import NextLink from 'next/link'

import { Toolbar, AppBar, Typography, Link, Box, Button, IconButton, Badge } from '@mui/material'

import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

export const Navbar = () => {
  return (
    <AppBar position="fixed" color="primary">
        <Toolbar>
            <NextLink href="/" passHref>
                <Link display="flex" alignItems="center">
                    <Typography variant='h6'>CW |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 } />

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <NextLink href="/category/men" passHref>
                    <Link>
                        <Button>Men</Button>
                    </Link>
                </NextLink>
                <NextLink href="/category/women" passHref>
                    <Link>
                        <Button>Women</Button>
                    </Link>
                </NextLink>
                <NextLink href="/category/kid" passHref>
                    <Link>
                        <Button>Kid</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={ 1 } />

            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NextLink href="/cart" passHref>
                <Link>
                    <IconButton>
                        <Badge badgeContent={ 2 } color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            
            <Button>
                Menú
            </Button>
        </Toolbar>
    </AppBar>
  )
}
