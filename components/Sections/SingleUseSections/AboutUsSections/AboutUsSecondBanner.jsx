import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import React from 'react';
import ImageContainerWithBtns from '../../SharedSections/ImageContainerWithBtns';

const AboutUsSecondBanner = ({useFormPropObj}) => {
    return (
        <>
            <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', margin: '1em 0' }} >
                <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                    <DynamicTitle text={'Section 01'} styles={{ padding: '0 0 0.3em 1em' }} />
                </FlexContainer>

                <FlexContainer grid={12} styles={{ flexDirection: 'row' }} >


                    <FlexContainer grid={6} styles={{
                        // justifyContent: 'start',
                        flexDirection: 'column',
                    }}>
                        
                            <InputFieldComp
                               
                                dataObj={{
                                    placeholder: 'Heading',
                                    target: 'secondBanner.heading',
                                    label: 'Heading'
                                }}
                                styles={{ margin: '0.7em 0 0 0' }}
                                useFormPropObj={useFormPropObj}
                            />
                             <InputFieldComp
                               
                               dataObj={{
                                   placeholder: 'Sub Heading',
                                   target: 'secondBanner.subHeading',
                                   label: 'Sub Heading'
                               }}
                               styles={{ margin: '0.7em 0 0 0' }}
                               useFormPropObj={useFormPropObj}
                           />
                     
                    </FlexContainer>
                    <FlexContainer grid={6} >

                        <ImageContainerWithBtns
                            imageSrc={useFormPropObj.getValues(`${useFormPropObj.formName}.firstBannerObj.imgUrl`)}
                            target={`${useFormPropObj.formName}.firstBannerObj.imgUrl`}
                            useFormPropObj={useFormPropObj}
                            placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"

                        // onImageChange={handleImageChange}
                        // onImageRemove={handleImageRemove}
                        />
                        {/* <button onClick={() => setImage({ src: 'https://via.placeholder.com/300', alt: 'Larger Placeholder Image', width: 300, height: 300 })}>Load Larger Image</button> */}
                    </FlexContainer>
                </FlexContainer>
            </ChipContainer>
        </>
    )
};

export default AboutUsSecondBanner;
