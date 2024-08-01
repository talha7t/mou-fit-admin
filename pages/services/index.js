import React from 'react';
import { useRouter } from 'next/router';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import DataTableComp from '@/components/Widgets/SharedWidgets/Tables/DataTableComp';



const ServicesList = () => {
    const router = useRouter();
    return (
        <FlexContainer grid={12} classes='content-container'>
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
        </FlexContainer>
    )
};

export default ServicesList;