import React from 'react';
import { Card, CardMedia } from '@mui/material';

// Placeholder image URL - you can replace this with your own default image URL
const defaultImageUrl = 'https://via.placeholder.com/150';

function ImageComponent({ imageUrl = defaultImageUrl }) {
    const style = {
        card: {
            maxWidth: 345, // Adjust card size as needed
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow for depth
            borderRadius: '10px', // Rounded corners for the card
            overflow: 'hidden', // Ensures the image is contained within the border radius
        },
        media: {
            height: 140, // Adjust image height as needed
        },
    };

    return (
        <Card style={style.card}>
            <CardMedia
                component="img"
                image={imageUrl}
                alt="Aesthetic Image"
                style={style.media}
            />
        </Card>
    );
}

export default ImageComponent;
