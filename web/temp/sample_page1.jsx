import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, SwipeableDrawer, Box, Typography, IconButton } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import VideoPlayer from 'react-player';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import './Screen.css'; // Make sure to create this CSS file
import logoImage from '../assets/logo.png';
import sampleProducts from '../data/sampleProducts'; // Assume this is an array of product objects
import sampleImages from '../data/sampleImages'; // Assume this is an array of image URLs

// ... other imports and sample data

const Screen = ({ items }) => {
    // ... existing state and useEffect

    const renderItems = () => {
        if (!items || items.length === 0) {
            // Render default content when items is empty, null, or undefined
            return renderDefaultContent();
        } else {
            // Map over items and render based on the item type
            return items.map((item, index) => {
                switch (item.type) {
                    case 'countdown':
                        return <CountdownComponent key={index} settings={item.settings} />;
                    case 'circle_collection':
                    case 'circle_products':
                        return <SwipeableCircleComponent key={index} items={item.items} />;
                    case 'gallery_products':
                        return <SwipeableProductsComponent key={index} products={item.products} />;
                    // Add more cases for other item types
                    default:
                        return <div key={index}>Unsupported item type</div>;
                }
            });
        }
    };

    const renderDefaultContent = () => {
        // Define your default content render logic here
        return (
            <Box>
                {/* Default content such as swipeable views, video player, etc. */}
            </Box>
        );
    };

    // ... existing component code

    return (
        <div className="iphone-wrapper">
            {/* AppBar and other static content */}
            <Box className="iphone-screen">
                {/* Render the items or default content */}
                {renderItems()}
            </Box>
            {/* Bottom Home Indicator and Drawer */}
        </div>
    );
};

export default Screen;
