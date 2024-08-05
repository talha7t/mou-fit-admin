import React from 'react';
import { useRouter } from 'next/router';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import DataTableComp from '@/components/Widgets/SharedWidgets/Tables/DataTableComp';
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

const ServicesList = () => {
    const router = useRouter();
    return (
        <Box sx={containerStyles}>
            <ChipContainer  >
                <TitleAndBtnRow data={{
                    text: 'Services',
                    title: 'Create New',
                    onClick: () => router.push('/services/createService')
                }}
                    styles={{
                        margin: '0 1em'
                    }}
                />
            
                {/* <DataTableComp dataObj={{
                    tableTitle: 'Services Table'
                }} /> */}
            </ChipContainer>
        </Box>
    )
};

export default ServicesList;