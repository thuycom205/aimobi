import React from 'react';
import SwipeableViews from "react-swipeable-views";
import { Typography } from '@mui/material';

// Make sure the CSS classes are defined in your CSS file

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

const RecentViewed = () => {
    // Determine how many images per swipe view
    const imagesPerView = 3;

    // Chunk the sampleImages into groups of imagesPerView
    const chunkedImages = [];
    for (let i = 0; i < sampleImages.length; i += imagesPerView) {
        chunkedImages.push(sampleImages.slice(i, i + imagesPerView));
    }

    return (
        <>
            <Typography variant="h6" align="center" className="product-collection-title">
                Recent Viewed
            </Typography>
            <SwipeableViews enableMouseEvents>
                {chunkedImages.map((imageGroup, groupIndex) => (
                    <div key={groupIndex} className="swipe-view-container">
                        {imageGroup.map((image, index) => (
                            <div key={index} className="circular-image-container">
                                <img src={image} alt={`Featured Collection ${groupIndex * imagesPerView + index}`} className="circular-image" />
                            </div>
                        ))}
                    </div>
                ))}
            </SwipeableViews>
        </>
    );
};

export default RecentViewed;
