import SectionWithLogoHeaderAndInput from '@/components/Sections/SharedSections/SectionWithLogoHeaderAndInput';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import squaresImg from '../../public/images/two-boxes.png'
import Image from 'next/image';


const GetVerified = () => {
    const { register, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            getVerifiedForm: {
                emailField: '',
            },
        }
    });

    const useFormPropObj = {
        formName: 'getVerifiedForm',
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
                        title: "Enter Verification Code",
                        buttonText: "Verify",
                        dynamicFields: [
                            { target: `emailField`, label: 'Verfication Code', placeholder: 'Enter Code' },
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
}

export default GetVerified
