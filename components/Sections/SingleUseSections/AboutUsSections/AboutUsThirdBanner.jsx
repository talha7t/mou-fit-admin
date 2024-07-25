import DynamicAccordion from '@/components/Widgets/SharedWidgets/Accordion/DynamicAccordion'
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer'
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer'
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle'
import React from 'react'

const AboutUsThirdBanner = ({ useFormPropObj, uniqueKey }) => {
    return (
        <>
            <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', margin: '1em 0' }} >
                <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                    <DynamicTitle text={'Features'} styles={{ padding: '0 0 0.3em 1em' }} />
                </FlexContainer>

                <FlexContainer grid={12} styles={{ flexDirection: 'row', justifyContent: 'start' }} >


                    <FlexContainer grid={6} >
                        <DynamicAccordion dataObj={{
                            arrStr: 'features',
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
}

export default AboutUsThirdBanner
