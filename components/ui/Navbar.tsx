import { useState, useContext } from 'react'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { Toolbar, AppBar, Typography, Link, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material';

import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { UiContext, CartContext } from '../../context';

export const Navbar = () => {
    
    const { pathname, push } = useRouter()
    
    const { numberOfItems } = useContext(CartContext)
    const { toggleSideMenu } = useContext(UiContext)

    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0 ) return;

        push(`/search/${searchTerm}`)
    }

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

                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} className="fadeIn">
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

                { isSearchVisible ? (
                    <Input
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                        className="fadeIn"
                        value={ searchTerm }
                        onChange={ e => setSearchTerm(e.target.value) }
                        onKeyPress={ e => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Search..."
                        autoFocus
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ () => setIsSearchVisible(false)}
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                ) : (
                    <IconButton
                        onClick={ () => setIsSearchVisible(true)}
                        className="fadeIn"
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                        <SearchOutlined  />
                    </IconButton>
                )}

                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined />
                </IconButton>
                

                <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ numberOfItems > 9 ? '+9' : numberOfItems } color="secondary">
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
