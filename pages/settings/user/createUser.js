import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';

import CreateUserRightCol from '@/components/Sections/SingleUseSections/CreateUserSections/CURightCol';
import CreateUserLeftCol from '@/components/Sections/SingleUseSections/CreateUserSections/CULeftCol';



const CreateUser = () => {

    const { register, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            createUserForm: {
                leftCol: {
                    firstName: '',
                    userName: '',
                    password: '',
                },
                rightCol: {
                    lastName: '',
                    email: '',
                    role: '',
                },
            }
        }
    });
    const useFormPropObj = {
        formName: 'createUserForm',
        register,
        getValues,
        setValue,
        watch,
    };

    const onSubmit = (data) => {
        console.log(watch());
        checkForEmptyFields()
        // console.log(watch())
    };

    const checkForEmptyFields = () => {

        if (getValues('createUserForm.leftCol.firstName') ||
            getValues('createUserForm.leftCol.userName') ||
            getValues('createUserForm.leftCol.password') ||
            getValues('createUserForm.rightCol.lastName') ||
            getValues('createUserForm.rightCol.role') ||
            getValues('createUserForm.rightCol.email')
        ) {
            return true;
        } else {
            return false;
        };
    }


    let padding = '4em 0 0 ';



    useEffect(() => {
        console.log(watch());
    }, [watch]);

    return (
        <Grid container
            sx={{
                padding: {
                    sm: `${padding} 6em`,
                    md: `${padding} 5em`,
                    lg: `${padding} 1.2em`,
                    xl: `${padding} 0em`
                },
            }}
            spacing={1}
        >

            <form style={{ width: '97%' }} onSubmit={handleSubmit(onSubmit)}>

                <ChipContainer styles={{
                    padding: '1em 1.3em',
                    margin: '0 0 0 1em',

                }} >
                    {/* TITLE AND BTN ROW */}
                    <TitleAndBtnRow data={{
                        text: 'Add User',
                        onClick: onSubmit,
                        backLink: '/settings/user'
                    }} styles={{
                        margin: '0 0  1em 0'
                    }}
                    />

                    <CreateUserLeftCol useFormPropObj={useFormPropObj} />

                    <CreateUserRightCol useFormPropObj={useFormPropObj} />

                </ChipContainer>
            </form>
        </Grid>
    )
};

export default CreateUser;