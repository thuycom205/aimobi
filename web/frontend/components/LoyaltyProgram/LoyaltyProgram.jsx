import React from 'react';
import { Card, CardContent, Typography, Box, Grid, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function LoyaltyProgram({ points }) {
    // Assume a basic logic for points to level conversion
    const level = Math.min(Math.floor(points / 100), 5); // Max level is 5

    const style = {
        card: {
            maxWidth: 345,
            margin: 'auto',
            textAlign: 'center',
            backgroundColor: '#fafafa', // Light background for the card
        },
        title: {
            fontSize: 24,
            color: '#333',
            marginBottom: '20px',
        },
        points: {
            fontSize: 18,
            color: '#666',
            marginBottom: '10px',
        },
        stars: {
            color: '#ffd700', // Gold color for stars
        },
    };

    return (
        <Card style={style.card}>
            <CardContent>
                <Typography style={style.title} gutterBottom>
                    Loyalty Program
                </Typography>
                <Typography style={style.points}>
                    Your Points: {points}
                </Typography>
                <Box>
                    <Grid container justifyContent="center">
                        {[...Array(5)].map((_, index) => (
                            <Grid item key={index}>
                                <IconButton>
                                    {index < level ? <StarIcon style={style.stars} /> : <StarBorderIcon style={style.stars} />}
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}

export default LoyaltyProgram;
