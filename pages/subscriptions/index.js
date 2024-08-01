import React from 'react';
import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import DataTableComp from '@/components/Widgets/SharedWidgets/Tables/DataTableComp';
import { useRouter } from 'next/router';
import AuthWrapper from '@/components/Utils/Auth/authWrapper';

const SubscriptionList = () => {
    const router = useRouter();
    return (
        <FlexContainer grid={12} classes='content-container'>
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
        </FlexContainer>
    )
};

// export default AuthWrapper(SubscriptionList);
export default SubscriptionList;
