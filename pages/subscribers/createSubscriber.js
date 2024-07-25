import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import CSLeftColSection from '@/components/Sections/SingleUseSections/CreateSubscriberSections/CSLeftColSection';
import CSRightColSection from '@/components/Sections/SingleUseSections/CreateSubscriberSections/CSRightColSection';

const CreateSubscriber = () => {

    const { register, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            createSubsForm: {
                leftCol: {
                    name: '',
                    cnic: '',
                    gender: '',
                    email: '',
                },
                rightCol: {
                    contact: '',
                    age: '',
                    country: '',
                    plan: '',
                },
            }
        }
    });
    const useFormPropObj = {
        formName: 'createSubsForm',
        register,
        getValues,
        setValue,
        watch,
    };

    const onSubmit = (data) => {
        console.log(watch());
        // console.log(watch())
    };

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
                        text: 'Create Subscriber',
                        onClick: onSubmit
                    }} styles={{
                        margin: '0 0  1em 0'
                    }}
                    />

                    <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 1em', width: '100%' }} >
                        <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                            <DynamicTitle text={'Basic Detail'} styles={{ padding: '0 0 0.3em 0' }} />
                        </FlexContainer>

                    {/* <FlexContainer grid={12}  > */}
                        <CSLeftColSection useFormPropObj={useFormPropObj} />
                        <CSRightColSection useFormPropObj={useFormPropObj} />

                    {/* </FlexContainer> */}
                    </ChipContainer>
                </ChipContainer>
            </form>
        </Grid>
    )
};

export default CreateSubscriber;