import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Logo from "../Images/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
// import compose from "../Images/compose.png";
import { useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import MuiMenu from '@mui/material/Menu';

// Subtler Icons for the dropdown/drawer
import AddIcon from '@mui/icons-material/Add';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = React.useContext(AuthContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [showSearchBar, setShowSearchBar] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearchQuery(params.get('search') || '');
    }, [location.search]);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            if (searchQuery) {
                navigate(`/?search=${searchQuery}`);
            } else {
                navigate('/');
            }
            if (!isLargeScreen) {
                setShowSearchBar(false);
            }
            if (isMobile) {
                setDrawerOpen(false);
            }
        }
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMyPostsClick = () => {
        navigate("/myposts");
        handleCloseUserMenu();
    };

    const handleNewPostClick = () => {
        navigate("/write");
        handleCloseUserMenu();
    };

    const primaryNavItems = [
        { name: "🏠 Home", path: "/" },
        { name: "✈️ Travel", path: "/?cat=travel" },
        { name: "💻 Tech", path: "/?cat=tech" },
        { name: "📰 News", path: "/?cat=news" },
        { name: "🩺 Health", path: "/?cat=health" },
        { name: "💼 Career", path: "/?cat=career" },
    ];


    const handleLogout = () => {
        logout();
        navigate("/login");
        handleCloseUserMenu();
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" sx={{ my: 2, color: 'black', fontWeight: 'bold' }}>
                Navigation
            </Typography>
            <Divider />
            <List>
                {primaryNavItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton component={Link} to={item.path} sx={{ textAlign: 'center', '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                            <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '1rem', fontWeight: 'medium' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {currentUser && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleNewPostClick} sx={{ textAlign: 'center', '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                                <AddIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                <ListItemText primary="NEW POST" primaryTypographyProps={{ fontSize: '1rem', fontWeight: 'medium', color: theme.palette.primary.main }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleMyPostsClick} sx={{ textAlign: 'center', '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                                <DescriptionOutlinedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                <ListItemText primary="MY POSTS" primaryTypographyProps={{ fontSize: '1rem', fontWeight: 'medium', color: theme.palette.primary.main }} />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
                <Divider sx={{ my: 1 }} />
                <ListItem disablePadding>
                    <ListItemButton onClick={currentUser ? handleLogout : () => navigate('/login')} sx={{ textAlign: 'center', '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                        {currentUser ? (
                            <ExitToAppIcon sx={{ mr: 1, color: theme.palette.error.main }} />
                        ) : (
                            <LockOpenOutlinedIcon sx={{ mr: 1, color: theme.palette.success.main }} />
                        )}
                        <ListItemText primary={currentUser ? "LOGOUT" : "LOGIN"} primaryTypographyProps={{ fontSize: '1rem', fontWeight: 'medium', color: currentUser ? theme.palette.error.main : theme.palette.success.main }} />
                    </ListItemButton>
                </ListItem>
                {currentUser && (
                    <ListItem>
                        <ListItemText primary={`Welcome ${currentUser.username}!`} sx={{ textAlign: 'center', fontStyle: 'italic', color: theme.palette.text.secondary }} />
                    </ListItem>
                )}
            </List>
            <Box sx={{ p: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchSubmit}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="submit search"
                                    onClick={handleSearchSubmit}
                                    edge="end"
                                    size="small"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        style: { borderRadius: '25px', backgroundColor: '#f0f0f0', paddingLeft: '10px' },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '25px',
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: 'transparent',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.main,
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    );

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "black", padding: { xs: "10px", md: "15px" }, color: "white" }} elevation={0}>
                    <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', minHeight: '64px !important', gap: { xs: 0, md: '10px' } }}>
                        <Link to="/">
                            <img
                                style={{ height: isMobile ? "45px" : "60px", cursor: "pointer", transition: 'height 0.3s ease-in-out' }}
                                src={Logo}
                                alt="Blog Logo"
                            />
                        </Link>

                        {isMobile ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {currentUser && (
                                    <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.9rem' }, pr: 1, color: 'rgba(255,255,255,0.8)' }}>
                                        Hi, {currentUser.username}!
                                    </Typography>
                                )}
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={handleDrawerToggle}
                                    sx={{ ml: 1 }}
                                >
                                    <MenuIcon sx={{ fontSize: '2rem' }} />
                                </IconButton>
                            </Box>
                        ) : (
                            <>
                                {/* Central Navigation Items */}
                                <Box sx={{ display: "flex", gap: { md: "1vw", lg: "1.5vw" }, justifyContent: "center", mx: 'auto' }}>
                                    {primaryNavItems.map((item) => (
                                        <Button
                                            key={item.name}
                                            component={Link}
                                            to={item.path}
                                            sx={{
                                                color: "white",
                                                fontWeight: 'bold',
                                                fontSize: { md: '0.9rem', lg: '1rem' },
                                                whiteSpace: 'nowrap',
                                                minWidth: 'auto',
                                                px: { md: '8px', lg: '12px' },
                                                '&:hover': {
                                                    color: theme.palette.primary.light,
                                                    textDecoration: 'underline',
                                                    textUnderlineOffset: '4px',
                                                    backgroundColor: 'transparent'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {item.name}
                                        </Button>
                                    ))}
                                </Box>

                                {/* Right Section: Search, User Info, Write, Auth Buttons */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: { md: "10px", lg: "15px" } }}>
                                    {/* Search Toggle / Input */}
                                    {showSearchBar && !isMobile ? (
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            onKeyDown={handleSearchSubmit}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                                                    </InputAdornment>
                                                ),
                                                style: { color: 'white', borderRadius: '20px', paddingLeft: '5px' },
                                            }}
                                            sx={{
                                                width: '160px',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '20px',
                                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                                    '& fieldset': {
                                                        borderColor: 'transparent',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(255,255,255,0.5)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'white',
                                                    },
                                                },
                                                '& .MuiInputBase-input::placeholder': {
                                                    color: 'rgba(255,255,255,0.7)',
                                                    opacity: 1,
                                                },
                                            }}
                                            autoFocus
                                        />
                                    ) : (
                                        <IconButton
                                            color="inherit"
                                            onClick={() => setShowSearchBar(true)}
                                            sx={{ p: '8px' }}
                                        >
                                            <SearchIcon sx={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.9)' }} />
                                        </IconButton>
                                    )}

                                    {currentUser ? (
                                        <>
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <AccountCircleIcon sx={{ fontSize: '2.5rem', color: 'white' }} />
                                            </IconButton>
                                            <MuiMenu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElUser)}
                                                onClose={handleCloseUserMenu}
                                            >
                                                <MenuItem onClick={handleMyPostsClick}>
                                                    <DescriptionOutlinedIcon sx={{ mr: 1 }} />
                                                    <Typography textAlign="center">My Posts</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={handleNewPostClick}>
                                                    <AddIcon sx={{ mr: 1 }} />
                                                    <Typography textAlign="center">New Post</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={handleLogout}>
                                                    <ExitToAppIcon sx={{ mr: 1, color: 'error.main' }} />
                                                    <Typography textAlign="center" color="error">Logout</Typography>
                                                </MenuItem>
                                            </MuiMenu>
                                        </>
                                    ) : (
                                        <Button
                                            color="inherit"
                                            sx={{
                                                border: "2px solid white",
                                                borderRadius: '25px',
                                                padding: '8px 20px',
                                                '&:hover': {
                                                    borderColor: theme.palette.success.light,
                                                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                                                    color: theme.palette.success.light
                                                },
                                                transition: 'all 0.3s ease',
                                                textTransform: 'uppercase',
                                                whiteSpace: 'nowrap'
                                            }}
                                            variant="outlined"
                                            onClick={() => { navigate('/login') }}
                                        >
                                            Login
                                        </Button>
                                    )}
                                </Box>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <nav>
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    anchor="right"
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, backgroundColor: theme.palette.background.default },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </div>
    );
}

export default Navbar;