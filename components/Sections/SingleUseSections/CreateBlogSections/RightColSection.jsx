import React from 'react';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';

const RightColSection = ({useFormPropObj}) => {
  return (
    <FlexContainer grid={6} styles={{
        alignItems: 'baseline'
    }} >
     {/* FIRST INPUT */}
     <InputFieldComp
                dataObj={{
                    placeholder: 'URL Handle',
                    target: 'urlHandle',
                    label: 'URL Handle'
                }}
                styles={{
                    margin: '0.7em 0 0 0',
                    width: '100%'
                }}
                useFormPropObj={useFormPropObj}
            />
        </FlexContainer>  )
};

export default RightColSection;