import React from 'react';
import DataTableComp from '@/components/Widgets/SharedWidgets/Tables/DataTableComp';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

const containerStyles = {
  padding: {
    xs: `4em 1rem 1rem 1rem`,
    sm: "4em 2rem 0 260px",
    md: "4em 2rem 0 260px",
    lg: "4em 2rem 0 260px",
    xl: "4em 2rem 0 260px",
  },
}

const BlogList = () => {

  const router = useRouter();

  return (
    <Box sx={containerStyles}>

      <ChipContainer  >
        <TitleAndBtnRow data={{
          text: 'Blogs',
          title: 'Create New',
          onClick: () => router.push('/customization/blog/createBlog')
        }}
        styles={{
          margin: '0 1em'
        }}
        />
        <DataTableComp />

      </ChipContainer>
    </Box>
  )
}

export default BlogList;