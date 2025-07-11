import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
    AppBar, Avatar, Box,
    ListItemText, ListItem, ListItemAvatar, 
    ListItemButton, Toolbar, Typography, 
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import DateTimeLabel from "../DateTimeLabel/DateTimeLabel";
import NewsletterSignupForm from '@components/Custom/forms/premade/Newsletter';
import useUtilityStore from "@store/utilityStore";
import { useWindowSize } from "usehooks-ts";
import MenuIcon from "@mui/icons-material/Menu";
import headshotImage from "@theme/../assets/avatar.jpg"
import woodwardStudioLogo from "@theme/../assets/woodward-studio-logo.jpg"

export const Navbar = () => {
    const utilityStore = useUtilityStore();
    const navigate = useNavigate();
    const windowSize = useWindowSize();
    const anchorRef = useRef<any | null>(null);
    const isMobile = windowSize.width < 600;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navItems = [
        {
            label: "Home",
            path: "/"
        },
        {
            path: "/posts",
            label: "Posts"
        },
        {
            path: "/consulting",
            label: "Services"
        },
        {
            label: "Subscribe",
            onClick: () => utilityStore.setModal({
                open: true,
                content: (<NewsletterSignupForm />)
            })
        },
        // {
        //     label: <ThemeToggleButton />
        // }
    ];

    const handleMenu = () => {
        setAnchorEl(anchorRef.current);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            sx={{
                zIndex: 100,
                backdropFilter: "blur(12px)",
                bgcolor: "transparent",
                border: "none",
                boxShadow: "none",
                color: (utilityStore.colorMode === "light") ? "#333" : "#ccc"
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={woodwardStudioLogo} />
                    </ListItemAvatar>
                    <ListItemText 
                        primary={
                            <Typography color="inherit" variant="h6" component="h6">
                                <span style={{ textDecoration: "underline", textDecorationLine: "underline" }}>Woodward Studio</span>
                            </Typography>
                        }
                        secondary={<><DateTimeLabel /> cst</>}
                    />
                </ListItem>
                <Box sx={{ display: "flex" }}>
                    {!isMobile ? navItems.map((listItem: any, index: number) => (
                        <ListItemText 
                            key={index}
                            // @ts-ignore
                            component={ListItemButton}
                            primary={listItem.label}
                            color="inherit"
                            sx={{
                                cursor: "pointer",
                                fontWeight: "bold",
                                "&:hover": {
                                    color: "primary.main",
                                }
                            }}
                            onClick={listItem?.path
                                ? () => listItem.path && navigate(listItem.path)
                                : listItem.onClick
                            }
                        />
                    )).filter(Boolean) : (
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="menu"
                                edge="end"
                                onClick={handleMenu}
                                ref={anchorRef}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                {navItems.map((listItem: any, index: number) => (
                                    <MenuItem key={index}>
                                        <ListItemButton>
                                            <ListItemText
                                                primary={listItem.label}
                                                color="inherit"
                                                sx={{
                                                    cursor: "pointer",
                                                    fontWeight: "bold",
                                                    "&:hover": {
                                                        color: "primary.main",
                                                    }
                                                }}
                                                onClick={() => {
                                                    if (listItem?.path) navigate(listItem.path);
                                                    if (listItem?.onClick) listItem.onClick();
                                                    handleClose();
                                                }}
                                            />
                                        </ListItemButton>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>

                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};