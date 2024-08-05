import { Box } from '@mui/material';
import React from 'react'

const containerStyles = {
  padding: {
    xs: `4em 1rem 1rem 1rem`,
    sm: "4em 2rem 0 260px",
    md: "4em 2rem 0 260px",
    lg: "4em 2rem 0 260px",
    xl: "4em 2rem 0 260px",
  },
}

const TagsList = () => {
  return (
    <Box sx={containerStyles}>TagsList</Box>
  )
}

export default TagsList;