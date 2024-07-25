import React from 'react';
import { Grid } from '@mui/material';

const FlexContainer = ({
  styles = {},
  grid = 3,
  gridXs,
  gridSm,
  gridMd,
  gridLg,
  gridXl,

  customGrid = {},
  classes = '',
  children,
}) => {

  const {
    display = 'flex',
    alignItems = 'center',
    justifyContent = 'center',
    flexDirection = 'row',
    padding,
    margin,
    width,
    height,
    backgroundColor
  } = styles;

  // const {
  //   gridXs = grid,
  //   gridSm = grid,
  //   gridMd = grid,
  //   gridLg = grid,
  //   gridXl = grid,
  // } = customGrid;

  return (
    <Grid
      item

      xs={gridXs ?? grid}
      sm={gridSm ?? grid}
      md={gridMd ?? grid}
      lg={gridLg ?? grid}
      xl={gridXl ?? grid}
      className={`container ${classes}`}
      sx={{
        display,
        flexDirection,
        alignItems,
        justifyContent,
        padding,
        margin,
        width,
        backgroundColor,
        height,
      }}
    >
      {children}
    </Grid>
  );
};

export default FlexContainer;

