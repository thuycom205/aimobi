import React, {useState, useEffect} from 'react';
import {Box,Grid, Paper, Typography} from "@mui/material";
import SwipeableViews from "react-swipeable-views";



const CountdownComponent = () => {
    const [countdown, setCountdown] = useState(60 * 60); // Countdown from 1 hour, for example.

    const formatTime = () => {
        const hours = Math.floor(countdown / 3600);
        const minutes = Math.floor((countdown % 3600) / 60);
        const seconds = countdown % 60;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    return (
        <Typography variant="h5" align="center" className="countdown-timer">
            Countdown: {formatTime()}
        </Typography>
    )
}

export  default CountdownComponent;
