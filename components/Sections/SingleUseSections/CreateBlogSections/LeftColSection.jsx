import React from 'react';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';
import RichTextAreaEditor from '@/components/Widgets/SharedWidgets/TextArea/RichTextAreaEditor';
import ImageContainerWithBtns from '../../SharedSections/ImageContainerWithBtns';

const LeftColSection = ({ useFormPropObj, uniqueKey }) => {
    return (
        <FlexContainer grid={6} styles={{
            flexDirection: 'column'
        }} >

            {/* FIRST INPUT */}
            <InputFieldComp
                dataObj={{
                    placeholder: 'Title',
                    target: 'title',
                    label: 'Title'
                }}
                styles={{
                    margin: '0.7em 0 0 0',
                    width: '97%'
                }}
                useFormPropObj={useFormPropObj}
            />

            {/* SECOND INPUT */}
            <InputFieldComp
                dataObj={{
                    placeholder: 'Support Text',
                    target: 'supportText',
                    label: 'Support Text'
                }}
                styles={{
                    margin: '0.7em 0 0 0',
                    width: '97%'
                }}
                useFormPropObj={useFormPropObj}
            />

            {/* THIRD RichTextField */}
            <RichTextAreaEditor styles={{ margin: '1em 0', width: '97%' }}
                dataObj={{ target: 'description' }}
                useFormPropObj={useFormPropObj}
            />

            {/* Fourth Image */}
            <ImageContainerWithBtns
                    imageSrc={useFormPropObj?.getValues(`${useFormPropObj?.formName}.imgUrl`)}
                    placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"
                    useFormPropObj={useFormPropObj}
                    target={`${useFormPropObj?.formName}.imgUrl`}
                />


        </FlexContainer>
    )
};

export default LeftColSection;