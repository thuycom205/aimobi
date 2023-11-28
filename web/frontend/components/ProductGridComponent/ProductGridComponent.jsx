import React, {useState, useEffect} from 'react';
import {Box,Grid, Paper, Typography} from "@mui/material";
import SwipeableViews from "react-swipeable-views";


const sampleProducts = [
    // Add URLs to your product images here
    {
        imgPath: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/459619/item/goods_28_459619.jpg',
        label: 'Product 1'
    },
    {imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2'},
    {imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2'},
    {imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2'},
    {imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2'},
    {imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2'},
    {imgPath: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/458807/item/usgoods_07_458807.jpg?', label: 'Product 2'},
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

const ProductGridComponent = () => {
    const chunkedProducts = chunk(sampleProducts, 3);

    function chunk(arr, size) {
        return Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
            arr.slice(i * size, i * size + size)
        );
    }
 return (
    <Grid container spacing={2} sx={{padding: 2}}>
        {sampleImages.map((image, index) => (
            <Grid item xs={6} md={4} key={index}>
                <Paper>
                    <img src={image} alt={`Image ${index}`}
                         style={{width: '100%', height: 'auto'}}/>
                </Paper>
            </Grid>
        ))}
    </Grid>
 )
}

export  default ProductGridComponent;
