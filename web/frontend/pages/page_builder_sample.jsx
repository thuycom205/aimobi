import React ,{ useState, useEffect }from 'react';
import {AppBar, Toolbar, SwipeableDrawer, Box, Grid, Paper, Typography, IconButton ,Button} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import VideoPlayer from 'react-player';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import './Screen.css'; // Make sure to create this CSS file
import logoImage from '../assets/logo.png';

const sampleProducts = [
    // Add URLs to your product images here
    { imgPath: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/459619/item/goods_28_459619.jpg', label: 'Product 1' },
    { imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2' },
    { imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2' },
    { imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2' },
    { imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2' },
    { imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2' },
    { imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2' },
    // Add more products as needed
];

const sampleImages = [
    // Add URLs to your images here
    'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/449887/item/usgoods_69_449887.jpg',
    'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/459710/item/usgoods_34_459710.jpg',
    'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/460925/item/usgoods_34_460925.jpg',
    'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/460925/sub/goods_460925_sub11.jpg',
    'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/461808/item/usgoods_41_461808.jpg',
    'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/460927/item/usgoods_32_460927.jpg',
    // Add more images as needed
];

export default function Screen() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [countdown, setCountdown] = useState(60 * 60); // Countdown from 1 hour, for example.

    useEffect(() => {
        const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    // Format countdown into hours, minutes, seconds
    const formatTime = () => {
        const hours = Math.floor(countdown / 3600);
        const minutes = Math.floor((countdown % 3600) / 60);
        const seconds = countdown % 60;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const handleSearchClick = () => {
        // Handle the search click, e.g., open a search dialog or navigate to a search screen
        console.log('Search icon clicked');
    };
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };
    const chunkedProducts = chunk(sampleProducts, 3);

    function chunk(arr, size) {
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );
    }


    return (
        <div className="iphone-wrapper">

        <Box className="iphone-container">
            {/* AppBar with Logo and Search Icon */}
            <AppBar position="static" color="default" elevation={0} className="appbar">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        className="menu-button"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="app-logo">
                        <img src={logoImage} alt="App Logo" className="logo-image" />
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="search"
                        onClick={handleSearchClick}
                        className="search-button"
                    >
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {/* Top Notch */}
            <Box className="iphone-notch" />

            {/* Screen Content */}
            <Box className="iphone-screen">
        <Box >

            <Typography variant="h5" align="center" className="countdown-timer">
                Countdown: {formatTime()}
            </Typography>
            {/* Product Collection Title */}
            <Typography variant="h6" align="center" className="product-collection-title">
                Featured Collection
            </Typography>

            {/* Circular Images Grid */}
            {/* Swipeable Views for Circular Images */}
            <SwipeableViews enableMouseEvents slideStyle={{ display: 'flex' }}>
                <div className="swipe-view-container">
                    {sampleImages.slice(0, 3).map((image, index) => (
                        <div key={index} className="circular-image-container">
                            <img src={image} alt={`Circular image ${index}`} className="circular-image" />
                        </div>
                    ))}
                </div>
                {/* Add additional divs if there are more images */}
                {sampleImages.length > 3 && (
                    <div className="swipe-view-container">
                        {sampleImages.slice(3, 6).map((image, index) => (
                            <div key={index} className="circular-image-container">
                                <img src={image} alt={`Circular image ${index + 3}`} className="circular-image" />
                            </div>
                        ))}
                    </div>
                )}
                {/* You can add more divs if you have more than 6 images */}
            </SwipeableViews>
            {/* Swipeable Views for Product Collection */}
            <Box className="product-collection-container">
                <Typography variant="h4" align="center" className="collection-title">
                    Fall Favorites
                </Typography>
                <Box className="products-swipe-container">
                    <SwipeableViews enableMouseEvents>
                        {chunkedProducts.map((chunk, index) => (
                            <Box key={index} className="product-swipe-slide">
                                {chunk.map((product, index) => (
                                    <Box key={index} className="product-item">
                                        <img src={product.imgPath} alt={product.label} className="product-image" />
                                        <Typography variant="body2" align="center">{product.label}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </SwipeableViews>
                </Box>
            </Box>

            {/* Video Player */}
            <Box sx={{ padding: 2 }}>
                <VideoPlayer url="path/to/video.mp4" playing controls />
            </Box>

            {/* Grid of Images */}
            <Grid container spacing={2} sx={{ padding: 2 }}>
                {sampleImages.map((image, index) => (
                    <Grid item xs={6} md={4} key={index}>
                        <Paper>
                            <img src={image} alt={`Image ${index}`} style={{ width: '100%', height: 'auto' }} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
            </Box>

            {/* Bottom Home Indicator */}
            <Box className="iphone-home-indicator" />
        </Box>
            {/* Drawer */}
            <SwipeableDrawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                className="drawer"
            >
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    className="drawer-content"
                >
                    {/* Drawer content goes here */}
                    <Typography variant="h6">
                        Drawer Content
                    </Typography>
                    <Button onClick={toggleDrawer(false)}>Close Drawer</Button>
                </Box>
            </SwipeableDrawer>
        </div>
    );
}
