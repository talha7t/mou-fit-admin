import SectionWithLogoHeaderAndInput from '@/components/Sections/SharedSections/SectionWithLogoHeaderAndInput';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import squaresImg from '../../public/images/two-boxes.png'
import Image from 'next/image';

const ResetPassword = () => {
    const { register, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            resetPasswordForm: {
                password: '',
                confirmPassword: ''
            },
        }
    });

    const useFormPropObj = {
        formName: 'resetPasswordForm',
        register,
        getValues,
        setValue,
        watch,
    };

    const onSubmit = (data) => {
        console.log(watch());
        // console.log(watch())
    };

    useEffect(() => {
        console.log(watch());
    }, [watch]);

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
    <FlexContainer grid={10.5} >

        <SectionWithLogoHeaderAndInput
        dataObj={{
            title:"Reset Your Password",
            buttonText:"Reset",
            dynamicFields: [
                { target: `password`, label: 'Password', placeholder: 'Enter Password' },
                { target: `confirmPassword`, label: 'Confirm Password', placeholder: 'Enter Password Again' },
            ],
        }}
            useFormPropObj={useFormPropObj}
        />
    </FlexContainer>

    <FlexContainer grid={12} styles={{ justifyContent: 'end' }} >
        <Image src={squaresImg} alt={'alt'} width='421px' height='123px' />
    </FlexContainer>

</form>
  )
}

export default ResetPassword
