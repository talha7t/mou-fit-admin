import React from 'react';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';

const inputFieldData = [
    {
        placeholder: 'Name',
        target: 'leftCol.name',
        label: 'Name'
    },
    {
        placeholder: 'CNIC',
        target: 'leftCol.cnic',
        label: 'CNIC'
    },
    {
        placeholder: 'Gender',
        target: 'leftCol.gender',
        label: 'Gender'
    },
    {
        placeholder: 'Email',
        target: 'leftCol.email',
        label: 'Email'
    },
];

const CSLeftColSection = ({ useFormPropObj, uniqueKey }) => {
    return (
        <FlexContainer grid={6} styles={{
            flexDirection: 'column'
        }} >
            {inputFieldData.map((data, index) => (
                <InputFieldComp
                    key={index}
                    dataObj={data}
                    styles={{
                        margin: '0.7em 0 0 0',
                        width: '97%'
                    }}
                    useFormPropObj={useFormPropObj}
                />
            ))}
        </FlexContainer>
    )
};

export default CSLeftColSection;