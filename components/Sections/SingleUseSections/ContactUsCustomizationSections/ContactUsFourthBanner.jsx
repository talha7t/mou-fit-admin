import React from 'react';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import ImageContainerWithBtns from '../../SharedSections/ImageContainerWithBtns';
import InputsStackComp from '@/components/Widgets/SharedWidgets/InputFields/InputsStackComp';


const bannerSectionArr = [
    { placeholder: 'Banner Text', target: 'fourthBanner.bannerText', label: '' },
    { placeholder: 'Button Text', target: 'fourthBanner.btnText', label: '' },

];

const ContactUsFourthBanner = ({useFormPropObj}) => {

    const { formName, setValue } = useFormPropObj;

    return (
        <>
            <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', margin : '1em 0' }} >
                <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                    <DynamicTitle text={'Last Banner'} styles={{ padding: '0 0 0.3em 1em' }} />
                </FlexContainer>

                <FlexContainer grid={12} styles={{ flexDirection: 'row' }} >
                    
                    <InputsStackComp dataObj={{
                        arrToMap: bannerSectionArr,

                    }} useFormPropObj={useFormPropObj} 
                    />
                    <FlexContainer grid={6} >

                        <ImageContainerWithBtns
                            imageSrc={useFormPropObj.getValues(`${formName}.fourthBanner.imgSrc`)}
                            target={`${formName}.fourthBanner.imgSrc`}
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
    );
}

export default ContactUsFourthBanner;