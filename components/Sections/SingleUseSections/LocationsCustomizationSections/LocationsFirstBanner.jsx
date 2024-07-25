import React from 'react';
import BannerWithInputAndImg from '../../SharedSections/BannerWithInputAndImg';

const LocationsFirstBanner = ({ dataObj, useFormPropObj }) => {

    const { formName, setValue } = useFormPropObj;
    // const { changeImgFunc, removeImgFunc } = methodsObj;

    const handleImageChange = (src) => {
        // setImageSrc(src);
        setValue(`${formName}.${dataObj?.imgTarget ?? 'bannerImg'}`, src)
        // changeImgFunc(src);
    };

    const handleImageRemove = () => {
        // setImageSrc(null);
        // setValue(`${formName}.${taregt}`, src)
        setValue(`${formName}.${dataObj?.imgTarget ?? 'bannerImg'}`, '')

        // removeImgFunc();
    };
    return (
        <>
        <BannerWithInputAndImg dataObj={{
            inputTarget: 'bannerTitle',
            imgTarget: 'bannerImg',
            }} useFormPropObj={useFormPropObj} />
        {/* <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 1em', width: '50%' }} >
            <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                <DynamicTitle text={'Banner 01'} styles={{ padding: '0 0 0.3em 0' }} />
            </FlexContainer>
            <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                <FlexContainer grid={12} styles={{ justifyContent: 'start' }} >

                    <InputFieldComp
                        dataObj={{
                            placeholder: 'Banner Title',
                            target: `${formName}.${dataObj?.inputTarget ?? 'bannerImg'}`,
                            label: 'Banner Title'
                        }}
                        styles={{ margin: '0.7em 0 0 0' }}
                        useFormPropObj={useFormPropObj}
                    />
                </FlexContainer>

            </FlexContainer>
            <div style={{ width: '80%' }}>

                <ImageContainerWithBtns
                    imageSrc={useFormPropObj.getValues(`${formName}.${dataObj?.imgTarget ?? 'bannerImg'}`)}
                    placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"
                    onImageChange={handleImageChange}
                    onImageRemove={handleImageRemove}
                    imgStyles={{ margin: '4em 0 0 0' }}
                />
            </div>
        </ChipContainer> */}
        
        </>
    )
};

export default LocationsFirstBanner;