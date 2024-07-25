import React from 'react';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';
import SingleDropdown from '@/components/Widgets/SharedWidgets/Dropdown/SingleDropdown';

const inputFieldData = [
    {
        placeholder: 'Contact',
        target: 'rightCol.contact',
        label: 'Contact'
    },
    {
        placeholder: 'Age',
        target: 'rightCol.age',
        label: 'Age'
    },
];

const dropdownFieldData = [
    {
        placeholder: 'Country',
        target: 'rightCol.country',
        label: 'Country'
    },
    {
        placeholder: 'Plan',
        target: 'rightCol.plan',
        label: 'Plan'
    },
]
const CSRightColSection = ({ useFormPropObj, uniqueKey }) => {
    return (
        <FlexContainer grid={6} styles={{
            flexDirection: 'column',
            justifyContent: 'start'
        }} >
            {inputFieldData.map((data, index) => (
                <InputFieldComp
                    key={index}
                    dataObj={data}
                    styles={{
                        margin: '0.7em 0 0 0',
                        width: '96%'
                    }}
                    useFormPropObj={useFormPropObj}
                />
            ))}

            <SingleDropdown
                dataObj={{
                    target: 'rightCol.country',
                    label: 'Country',
                }}
                styles={{ width: '96%', margin: '0.8em' }}
                useFormPropObj={useFormPropObj}
            />

            <SingleDropdown
                dataObj={{
                    target: 'rightCol.plan',
                    label: 'Subscription Plan',
                }}
                styles={{ width: '96%' }}
                useFormPropObj={useFormPropObj}
            />
        </FlexContainer>
    )
};

export default CSRightColSection;