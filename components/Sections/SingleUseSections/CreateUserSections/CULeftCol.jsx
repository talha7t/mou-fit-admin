import React from 'react';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer'
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp'

const fieldsData = [
    { label: 'First Name', placeholder: 'First Name', target: 'leftCol.firstName', fieldType: 'text' },
    { label: 'User Name', placeholder: 'User Name', target: 'leftCol.userName', fieldType: 'text' },
    { label: 'Password', placeholder: 'Password', target: 'leftCol.password', fieldType: 'password' },
];

const CreateUserLeftCol = ({ useFormPropObj, uniqueKey }) => {
    return (
        <FlexContainer grid={6} styles={{
            flexDirection: 'column'
        }}>
            {fieldsData.map((field, i) => (
                <InputFieldComp
                    key={i}
                    dataObj={field}
                    styles={{ margin: '0.7em 0 0 0', width: '97%' }}
                    useFormPropObj={useFormPropObj}
                />
            ))}

        </FlexContainer>
    )
}

export default CreateUserLeftCol;