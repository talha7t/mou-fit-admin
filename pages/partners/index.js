import React from 'react';
import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import DataTableComp from '@/components/Widgets/SharedWidgets/Tables/DataTableComp';
import { useRouter } from 'next/router';
import AuthWrapper from '@/components/Utils/Auth/authWrapper';

const PartnerList = () => {
    const router = useRouter();

    return (
        <FlexContainer grid={12} classes='content-container'>
            <ChipContainer  >
                <TitleAndBtnRow data={{
                    text: 'Partners',
                    title: 'Create New',
                    onClick: () => router.push('/partners/createPartner')
                }}
                    styles={{
                        margin: '0 1em'
                    }}
                />
                {/* <DataTableComp dataObj={{
                    tableTitle: 'Partners Table'
                }} /> */}

            </ChipContainer>
        </FlexContainer>
    )
};

// export default AuthWrapper(PartnerList);
export default PartnerList;
