import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp'
import TextAreaComp from '@/components/Widgets/SharedWidgets/TextArea/TextAreaComp'
import React from 'react'
import ImageContainerWithBtns from './ImageContainerWithBtns'
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer'
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer'
import TwoInputFieldsComp from '@/components/Widgets/SharedWidgets/InputFields/TwoInputFieldsComp'

const TwoInputAndImgSection = ({ dataObj, useFormPropObj, children }) => {

    const { formName, getValues } = useFormPropObj

    return (
        <FlexContainer grid={12} styles={{ alignItems: 'start' }}  >
            {/* <div style={{width: '49%'}}></div> */}
            <FlexContainer grid={6} styles={{ flexDirection: 'column' }}  >

                <TwoInputFieldsComp useFormPropObj={useFormPropObj} dataObj={{
                    firstInput: {
                        target: dataObj?.firstInput?.target ?? 'secondBannerObj.heading',
                        placeholder: dataObj?.firstInput?.placeholder ?? 'Heading',
                        label: dataObj?.firstInput?.placeholder ??  'Heading',
                    },
                    secondInput: {
                        target: dataObj?.secondInput?.target ?? 'secondBannerObj.subHeading',
                        placeholder:  dataObj?.secondInput?.placeholder ?? 'Sub Heading',
                        label: dataObj?.secondInput?.placeholder ?? 'Sub Heading',
                    }
                }} />

            </FlexContainer>

            <FlexContainer grid={6} >
                <ImageContainerWithBtns
                    imageSrc={getValues(`${formName}.${dataObj?.imgTarget ?? 'secondBannerObj.imgUrl'}`)}
                    placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"
                    useFormPropObj={useFormPropObj}
                    target={`${formName}.${dataObj?.imgTarget ?? 'aboutUsBannerObj.imgUrl'}`}
                />
            </FlexContainer>

        </FlexContainer>
    )
}

export default TwoInputAndImgSection
