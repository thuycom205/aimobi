import React, {useState, useEffect} from 'react';
import {Box,Grid, Paper, Typography} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import VideoPlayer from "react-player";


const VideoComponent = () => {

    return (
        <Box sx={{padding: 2}}>
            <VideoPlayer url="path/to/video.mp4" playing controls/>
        </Box>
    )
}

export default VideoComponent;
