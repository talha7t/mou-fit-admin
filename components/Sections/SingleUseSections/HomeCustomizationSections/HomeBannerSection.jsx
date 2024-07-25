import React from 'react';

import ImageContainerWithBtns from '../../SharedSections/ImageContainerWithBtns';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import InputsStackComp from '@/components/Widgets/SharedWidgets/InputFields/InputsStackComp';




const HomeBannerSection = ({ useFormPropObj, uniqueKey, targetArr, body, targetImgDirect, disableImage }) => {

    const { formName, setValue } = useFormPropObj;

    // const bannerSectionArr = [
    //     { placeholder: 'Banner Title', target: `${uniqueKey}.title`, label: '' },
    //     { placeholder: 'Banner desc', target: `${uniqueKey}.desc`, label: '' },
    //     { placeholder: 'Button Text', target: `${uniqueKey}.btnText`, label: '' },
    //     // { placeholder: 'Button Url', target: `${uniqueKey}.btnLink`, label: '' },
    // ];

    const handleImageChange = (src) => {
        setValue(`${formName}.${uniqueKey}.imgUrl`, src);
    };

    const handleImageRemove = () => {
        setValue(`${formName}.${uniqueKey}.imgUrl`, '');
    };

    return (
        <>
            <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', margin: '1em 0 0 0' }} >
                <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                    <DynamicTitle text={'Banner 01'} styles={{ padding: '0 0 0.3em 1em' }} />
                </FlexContainer>
                <FlexContainer grid={12} styles={{ flexDirection: 'row', alignItems: 'flex-start' }} >

                    <InputsStackComp dataObj={{
                        arrToMap: targetArr,

                    }} useFormPropObj={useFormPropObj} />
                    <FlexContainer grid={6} styles={{ margin: '10px 0 0 0' }} >
                    {!disableImage && <ImageContainerWithBtns
                            imageSrc={ targetImgDirect ? useFormPropObj.getValues(`${formName}.${uniqueKey}.imgSrc`) : useFormPropObj.getValues(`${formName}.${uniqueKey}.body.imgSrc`)}
                            target={ targetImgDirect ? `${formName}.${uniqueKey}.imgSrc` : `${formName}.${uniqueKey}.body.imgSrc`}
                            useFormPropObj={useFormPropObj}
                            placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"

                        // onImageChange={handleImageChange}
                        // onImageRemove={handleImageRemove}
                        />}
                        
                        {/* <button onClick={() => setImage({ src: 'https://via.placeholder.com/300', alt: 'Larger Placeholder Image', width: 300, height: 300 })}>Load Larger Image</button> */}
                    </FlexContainer>
                </FlexContainer>
            </ChipContainer>
        </>
    );
};

export default HomeBannerSection;
