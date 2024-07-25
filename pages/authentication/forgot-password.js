import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import squaresImg from '../../public/images/two-boxes.png';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import SectionWithLogoHeaderAndInput from '@/components/Sections/SharedSections/SectionWithLogoHeaderAndInput';


const ForgotPassword = () => {
    const { register, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            forgotPasswordForm: {
                emailField: '',
            },
        }
    });

    const useFormPropObj = {
        formName: 'forgotPasswordForm',
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
                        buttonText: "Send",
                        linkText: "Login Instead",
                        dynamicFields: [
                            { target: `emailField`, label: 'Email', placeholder: 'Enter Email', fieldType: 'email' },
                            // { target: `emailField`, label: 'Email', placeholder: 'Enter Email' },
                        ]
                    }}
                    useFormPropObj={useFormPropObj}
                />
            </FlexContainer>

            <FlexContainer grid={12} styles={{ justifyContent: 'end' }} >
                <Image src={squaresImg} alt={'alt'} width='421px' height='123px' />
            </FlexContainer>

        </form>
    )
};

export default ForgotPassword;
