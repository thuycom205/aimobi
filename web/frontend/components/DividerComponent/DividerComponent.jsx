import React from 'react';
import { Divider } from '@mui/material';

function DividerComponent() {
    return (
        <>
            <div style={{ padding: '1px' }}>
                {/* Your content for the top section */}
            </div>

            {/* Divider */}
            <Divider />

            {/* Simulate the bottom section of the iPhone emulator */}
            <div style={{ padding: '1px' }}>
                {/* Your content for the bottom section */}
            </div>
        </>
    );
}

export default DividerComponent;
