import React from 'react';
import DataTableComp from '@/components/Widgets/SharedWidgets/Tables/DataTableComp';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import { useRouter } from 'next/router';

const BlogList = () => {

  const router = useRouter();

  return (
    <FlexContainer grid={12} styles={{margin: '2em'}}>

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
    </FlexContainer>
  )
}

export default BlogList;