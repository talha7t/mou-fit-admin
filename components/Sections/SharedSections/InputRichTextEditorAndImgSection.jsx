import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer'
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp'
import RichTextAreaEditor from '@/components/Widgets/SharedWidgets/TextArea/RichTextAreaEditor'
import React from 'react'
import ImageContainerWithBtns from './ImageContainerWithBtns'

const InputRichTextEditorAndImgSection = ({ dataObj, useFormPropObj, children }) => {
  const { formName, getValues } = useFormPropObj

    return (
        <FlexContainer grid={12} styles={{alignItems: 'start'}}  >
            {/* <div style={{width: '49%'}}></div> */}
            <FlexContainer grid={6} styles={{ flexDirection: 'column' }}  >

                <InputFieldComp
                    dataObj={{
                        placeholder: dataObj?.inputLabel ?? 'Title',
                        target: dataObj?.inputTarget ?? 'aboutUsBannerObj.title',
                        label: dataObj?.inputLabel ?? 'Title'
                    }}
                    styles={{ margin: '0.7em 0 0 0', width: '97%' }}
                    useFormPropObj={useFormPropObj}
                />

                <RichTextAreaEditor styles={{ margin: '1em 0', width: '97%' }}
                 dataObj={{ target: dataObj?.descriptionTarget ?? 'aboutUsBannerObj.description' }}
                 useFormPropObj={useFormPropObj}
                  />

                    {children}
                    
            </FlexContainer>

            <FlexContainer grid={6} styles={{margin: '10px 0 0 0'}} >
                <ImageContainerWithBtns
                    imageSrc={getValues(`${formName}.${dataObj?.imgTarget ?? 'aboutUsBannerObj.imgUrl'}`)}
                    placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"
                    useFormPropObj={useFormPropObj}
                    target={`${formName}.${dataObj?.imgTarget ?? 'aboutUsBannerObj.imgUrl'}`}
                />
            </FlexContainer>

        </FlexContainer>
    )
};

export default InputRichTextEditorAndImgSection;
