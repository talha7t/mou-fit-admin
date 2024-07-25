import React from 'react';
import { Typography } from '@mui/material';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['500'],
    subsets: ['latin']
});

const defaultStyles = {
    fontSize: '16px',
    fontWeight: '500',
    color: '#C4C4C4',
    textAlign: 'start',
    padding: '0',
};

const DynamicTitle = ({ text, styles = {}, variant = 'h6', className = poppins.className }) => {
    
    const sx = { ...defaultStyles, ...styles };

    return (
        <Typography variant={variant} className={className} sx={sx}>
            {text}
        </Typography>
    );
};

export default DynamicTitle;
