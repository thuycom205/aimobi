import React from 'react';
import { Typography } from '@mui/material';

function TitleComponent({ title }) {
    const style = {
        titleContainer: {
            padding: '20px',
            backgroundColor: '#f0f0f0', // You can adjust the background color
            textAlign: 'center',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Adding a subtle shadow for depth
            margin: '20px 0', // Adds margin around the title
        },
        titleText: {
            fontWeight: 'bold',
            color: '#333', // Adjust text color as needed
            fontSize: '24px', // Adjust font size as needed
        },
    };

    return (
        <div style={style.titleContainer}>
            <Typography variant="h5" style={style.titleText}>
                {title}
            </Typography>
        </div>
    );
}

export default TitleComponent;
