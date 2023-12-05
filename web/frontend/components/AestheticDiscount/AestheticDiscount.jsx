import React from 'react';
import { Typography, Paper } from '@mui/material';

function AestheticDiscount({ discount }) {
    const style = {
        discountContainer: {
            padding: '15px 30px',
            backgroundColor: '#ff4081', // Vibrant background color for attention
            color: '#ffffff', // Text color for contrast
            borderRadius: '8px', // Rounded corners
            textAlign: 'center', // Center align the text
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Adding a subtle shadow
            maxWidth: '300px', // Maximum width of the discount tag
            margin: 'auto', // Centering the discount tag
        },
        discountText: {
            fontWeight: 'bold',
            fontSize: '24px', // Large, eye-catching font size
        },
    };

    return (
        <Paper elevation={3} style={style.discountContainer}>
            <Typography variant="h6" style={style.discountText}>
                {discount ? `Save ${discount}%!` : 'Special Discount!'}
            </Typography>
        </Paper>
    );
}

export default AestheticDiscount;
