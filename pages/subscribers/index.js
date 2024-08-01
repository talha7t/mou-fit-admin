import React from 'react';
import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import DataTableComp from '@/components/Widgets/SharedWidgets/Tables/DataTableComp';
import { useRouter } from 'next/router';

const Subscribers = () => {
    const router = useRouter();
    return (
        <FlexContainer grid={12} classes='content-container'>
            <ChipContainer  >
                <TitleAndBtnRow data={{
                    text: 'Subscribers',
                    title: 'Create New',
                    onClick: () => router.push('/subscribers/createSubscriber')
                }}
                    styles={{
                        margin: '0 1em'
                    }}
                />
                {/* <DataTableComp dataObj={{
                    tableTitle: 'Subscribers Table'
                }} /> */}

            </ChipContainer>
        </FlexContainer>
    )
};

export default Subscribers;