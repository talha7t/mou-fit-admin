import React from 'react'
import TwoInputAndImgSection from '../../SharedSections/TwoInputAndImgSection'
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer'
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer'
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle'
import DynamicAccordion from '@/components/Widgets/SharedWidgets/Accordion/DynamicAccordion'

const HowItWorksSecondBanner = ({ useFormPropObj, dataObj }) => {
    return (
        <>
            <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 1em', width: '100%', margin: '1em 0' }} >

                {/* TITLE */}
                <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                    <DynamicTitle text={dataObj?.text ?? 'Banner 01'} styles={{ padding: '0 0 0.3em 0' }} />
                </FlexContainer>

                <TwoInputAndImgSection useFormPropObj={useFormPropObj} />

                <FlexContainer grid={12} styles={{ flexDirection: 'row', justifyContent: 'start' }} >

                    <FlexContainer grid={6} >
                        <DynamicAccordion dataObj={{
                            arrStr: 'accordions',
                            inputTarget: 'inputTarget',
                            descriptionTarget: 'descriptionTarget',
                            imgTarget: 'imgUrl',
                            appendObj: {
                                descriptionTarget: '',
                                inputTarget: '',
                                imgUrl: '',
                            }
                        }} useFormPropObj={useFormPropObj} />
                    </FlexContainer>

                </FlexContainer>
            </ChipContainer>
        </>
    )
};

export default HowItWorksSecondBanner;