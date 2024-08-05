import React from 'react';
import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import DataTableComp from '@/components/Widgets/SharedWidgets/Tables/DataTableComp';
import { useRouter } from 'next/router';
import AuthWrapper from '@/components/Utils/Auth/authWrapper';
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

const SubscriptionList = () => {
    const router = useRouter();
    return (
        <Box sx={containerStyles}>
            <ChipContainer  >
                <TitleAndBtnRow data={{
                    text: 'Subscriptions',
                    title: 'Create New',
                    onClick: () => router.push('/subscriptions/createSubscription')
                }}
                    styles={{
                        margin: '0 1em'
                    }}
                />
                {/* <DataTableComp dataObj={{
                    tableTitle: 'Subscriptions Table'
                }} /> */}
            </ChipContainer>
        </Box>
    )
};

// export default AuthWrapper(SubscriptionList);
export default SubscriptionList;
