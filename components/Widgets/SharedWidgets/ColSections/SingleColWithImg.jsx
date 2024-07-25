import React, {useEffect} from 'react'
import ChipContainer from '../Containers/ChipContainer';
import FlexContainer from '../Containers/FlexContainer';
import DynamicTitle from '../Text/DynamicTitle';
import InputsStackComp from '../InputFields/InputsStackComp';
import ImageContainerWithBtns from '@/components/Sections/SharedSections/ImageContainerWithBtns';
import InputFieldComp from '../InputFields/InputFieldComp';
import { Button, Grid } from '@mui/material';

const SingleColWithImg = ({ useFormPropObj, uniqueKey, targetArr, defaultImg, body, styles }) => {

    const { formName, setValue } = useFormPropObj;

    const handleImageChange = (src) => {
        setValue(`${formName}.${uniqueKey}.imgUrl`, src);
    };

    const handleImageRemove = () => {
        setValue(`${formName}.${uniqueKey}.imgUrl`, '');
    };
    // console.log(body)
    // console.log(uniqueKey)
    // useEffect(() => {
    // //   console.log(useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}`))
    //   useFormPropObj.setValue(`${useFormPropObj.formName}.${uniqueKey}`, useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}`))
    // //   console.log(useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}`))
    // }, [body, uniqueKey])
    
    const checkVal = () => {
      console.log(useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}`))
      console.log(`${useFormPropObj.formName}.${uniqueKey}`)
    //   useFormPropObj.setValue(`${useFormPropObj.formName}.${uniqueKey}`, body)
        
    }

    return (
        <>
        {/* <Button onClick={checkVal}>ch</Button> */}
            <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', height: styles?.height }} >
                <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                    <DynamicTitle text={'Banner 02'} styles={{ padding: '0 0 0.3em 1em' }} />
                </FlexContainer>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    {(targetArr || []).map((item, index) => (
                        <InputFieldComp
                            key={index}
                            dataObj={{
                                placeholder: item?.placeholder ?? '',
                                target: item?.target ?? '',
                                label: item?.placeholder ?? '',
                                value: item?.value ?? ''
                            }}
                            styles={{ margin: '0.7em 0 0 0', width: '90%' }}
                            useFormPropObj={useFormPropObj}
                        />
                    ))}
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', width: '90%' }} >

                        <ImageContainerWithBtns
                            imageSrc={useFormPropObj.getValues(`${formName}.${uniqueKey}.imgSrc`)}
                            target={`${formName}.${uniqueKey}.imgSrc`}
                            useFormPropObj={useFormPropObj}
                            placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"
                            imgStyles={{ width: '55%', height: '100%', margin: '10px 0 0 0' }}
                            defaultImg={defaultImg}
                        // onImageChange={handleImageChange}
                        // onImageRemove={handleImageRemove}
                        />
                    </Grid>
                </Grid>
            </ChipContainer>
        </>
    );
};

export default SingleColWithImg;