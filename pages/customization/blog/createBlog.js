import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import LeftColSection from '@/components/Sections/SingleUseSections/CreateBlogSections/LeftColSection';
import RightColSection from '@/components/Sections/SingleUseSections/CreateBlogSections/RightColSection';


const CreateBlog = () => {

    const { register, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            createBlogForm: {
                title: '',
                urlHandle: '',
                supportText: '',
                description: '',
                imgUrl: '',

            }
        }
    });
    const useFormPropObj = {
        formName: 'createBlogForm',
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
                        text: 'Create Blogs',
                        onClick: onSubmit
                    }} styles={{
                        margin: '0 0  1em 0'
                    }}
                    />

                    <Grid item xs={12} sx={{display: 'flex'}} >
                        
                        {/* LEFT COL SECTION */}
                        <LeftColSection useFormPropObj={useFormPropObj} />
                       
                        {/* RIGHT COL SECTION */}
                        <RightColSection useFormPropObj={useFormPropObj} />

                    </Grid>
                   
                </ChipContainer>
            </form>
        </Grid>
    )
};

export default CreateBlog;