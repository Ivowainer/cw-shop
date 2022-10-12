import { useContext } from 'react'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { Toolbar, AppBar, Typography, Link, Box, Button, IconButton, Badge } from '@mui/material'

import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { UiContext } from '../../context';

export const Navbar = () => {
    const { pathname } = useRouter()

    const { toggleSideMenu } = useContext(UiContext)

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
                            <Button color={pathname == '/category/men' ? 'primary' : 'info'}>Men</Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/women" passHref>
                        <Link>
                            <Button color={pathname == '/category/women' ? 'primary' : 'info'}>Women</Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/kid" passHref>
                        <Link>
                            <Button color={pathname == '/category/kid' ? 'primary' : 'info'}>Kid</Button>
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

                
                <Button onClick={toggleSideMenu}>Menú</Button>
            </Toolbar>
        </AppBar>
    )
}
