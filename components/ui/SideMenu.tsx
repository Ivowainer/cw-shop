import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { AuthContext, UiContext } from "../../context";

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import {
    AccountCircleOutlined,
    AdminPanelSettings,
    CategoryOutlined,
    ConfirmationNumberOutlined,
    EscalatorWarningOutlined,
    FemaleOutlined,
    LoginOutlined,
    MaleOutlined,
    SearchOutlined,
    VpnKeyOutlined,
} from "@mui/icons-material";

export const SideMenu = () => {
    const router = useRouter();

    const { user, isLoggedIn } = useContext(AuthContext);
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

    const [searchTerm, setSearchTerm] = useState("");

    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    };

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;

        navigateTo(`/search/${searchTerm}`);

        setSearchTerm("");
    };

    return (
        <Drawer open={isMenuOpen} onClose={toggleSideMenu} anchor="right" sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}>
            <Box sx={{ width: 250, paddingTop: 5 }}>
                <List>
                    <ListItem>
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
                            type="text"
                            placeholder="Search..."
                            autoFocus
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={() => onSearchTerm()} aria-label="toggle password visibility">
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {isLoggedIn ? (
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Profile"} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"My Orders"} />
                            </ListItem>
                        </>
                    ) : null}

                    <ListItem button sx={{ display: { xs: "", sm: "none" } }} onClick={() => navigateTo("/category/men")}>
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Men"} />
                    </ListItem>

                    <ListItem button sx={{ display: { xs: "", sm: "none" } }} onClick={() => navigateTo("/category/women")}>
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Women"} />
                    </ListItem>

                    <ListItem button sx={{ display: { xs: "", sm: "none" } }} onClick={() => navigateTo("/category/kid")}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Kids"} />
                    </ListItem>

                    {isLoggedIn ? (
                        <ListItem button>
                            <ListItemIcon>
                                <LoginOutlined />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItem>
                    ) : (
                        <ListItem button>
                            <ListItemIcon>
                                <VpnKeyOutlined />
                            </ListItemIcon>
                            <ListItemText primary={"Login"} />
                        </ListItem>
                    )}

                    {/* Admin */}
                    {user?.role === "admin" ? (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem button>
                                <ListItemIcon>
                                    <CategoryOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Products"} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Orders"} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <AdminPanelSettings />
                                </ListItemIcon>
                                <ListItemText primary={"Users"} />
                            </ListItem>
                        </>
                    ) : null}
                </List>
            </Box>
        </Drawer>
    );
};
