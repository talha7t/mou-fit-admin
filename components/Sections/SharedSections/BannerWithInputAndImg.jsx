import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import React from 'react'
import ImageContainerWithBtns from './ImageContainerWithBtns';

const BannerWithInputAndImg = ({ dataObj, useFormPropObj, styles }) => {

    const { formName, getValues, setValue } = useFormPropObj;

    const handleImageChange = (src) => {
        setValue(`${formName}.${dataObj?.imgTarget ?? 'bannerImg'}`, src)
    };

    const handleImageRemove = () => {
        setValue(`${formName}.${dataObj?.imgTarget ?? 'bannerImg'}`, '')
    };

    return (

        <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 1em', width: styles?.width ?? '50%' }} >

            {/* TITLE */}
            <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                <DynamicTitle text={dataObj?.text ?? 'Banner 01'} styles={{ padding: '0 0 0.3em 0' }} />
            </FlexContainer>

            {/* INPUT CONTAINER */}
            <FlexContainer grid={12} styles={{ justifyContent: 'start' }} >
                <InputFieldComp
                    dataObj={{
                        placeholder: 'Banner Title',
                        target: `${dataObj?.inputTarget ?? 'bannerTitle'}`,
                        label: 'Banner Title'
                    }}
                    styles={{ margin: '0.7em 0 0 0', width: '97%' }}
                    useFormPropObj={useFormPropObj}
                />
            </FlexContainer>

            {/* IMAGE CONTAINER */}
            <div style={{ width: '100%' }}>
                <ImageContainerWithBtns
                    imageSrc={getValues(`${formName}.${dataObj?.imgTarget ?? 'bannerImg'}`)}
                    placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"
                    useFormPropObj={useFormPropObj}
                    target={`${formName}.${dataObj?.imgTarget ?? 'bannerImg'}`}
                    // onImageChange={handleImageChange}
                    // onImageRemove={handleImageRemove}
                    imgStyles={{ margin: styles?.imgMargin ?? '4em 0 0 0' }}
                />
            </div>

        </ChipContainer>
    )
};

export default BannerWithInputAndImg;