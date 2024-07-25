import React from 'react';
import { Grid } from '@mui/material';

const ChipContainer = ({ styles, children }) => {

    const customStyles = {
        backgroundColor: styles?.bgColor ?? '#21222D',
        padding: styles?.padding ?? '10px',
        margin: styles?.margin ?? '0',
        width: styles?.width ?? '100%',
        height: styles?.height,
        borderRadius: styles?.bdrRadius ?? '6px',
        display: styles?.display,
        flexDirection: styles?.flexDirection,
        alignItems: styles?.alignItems,
        border: styles?.border
    };

    return (
        <Grid container
            // spacing={styles?.spacing ?? 2}
            style={customStyles}>
            {children}
        </Grid>
    );
};

export default ChipContainer;
