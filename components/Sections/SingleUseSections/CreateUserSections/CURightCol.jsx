import React from 'react';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';
import SingleDropdown from '@/components/Widgets/SharedWidgets/Dropdown/SingleDropdown';



const fieldsData = [
    { label: 'Last Name', placeholder: 'Last Name', target: 'rightCol.lastName', fieldType: 'text' },
    { label: 'Email', placeholder: 'Email', target: 'rightCol.email', fieldType: 'email' },
    // {label: 'Password', placeholder: 'Password', target: 'leftCol.password', fieldType: 'password'},
];

const CreateUserRightCol = ({ useFormPropObj}) => {

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

            <SingleDropdown
                dataObj={{
                    target: 'rightCol.role',
                    label: 'Role',
                }}
                styles={{ width: '97%', margin: '0.7em 0 0 0' }}
                useFormPropObj={useFormPropObj}
            />

        </FlexContainer>
    )
};

export default CreateUserRightCol;