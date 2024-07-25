import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import InputsStackComp from '@/components/Widgets/SharedWidgets/InputFields/InputsStackComp';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import React from 'react'



const bannerSectionArr = [
    { placeholder: 'Heading', target: 'secondBanner.heading', label: '' },
    { placeholder: 'Sub Heading', target: 'secondBanner.subHeading', label: '' },
];
const SubscriptionSecondBanner = ({useFormPropObj}) => {
  return (
    <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', margin: '1em 0 0 0', width: '50%' }} >
                <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                    <DynamicTitle text={'Section 01'} styles={{ padding: '0 0 0.3em 1em' }} />
                </FlexContainer>
                <FlexContainer grid={12} styles={{ flexDirection: 'row' }} >
        
                <InputsStackComp dataObj={{
                        arrToMap: bannerSectionArr,

                    }} useFormPropObj={useFormPropObj} 
                    grid={12}
                    // styles={{width: '95%'}}
                    />
                    </FlexContainer>
            </ChipContainer>
  )
};

export default SubscriptionSecondBanner;