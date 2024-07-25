import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer'
import React from 'react'
import ArticlesSection from '../../SharedSections/ArticlesSection'
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer'
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle'

const HomeArticleSection = ({ dataObj, styles, useFormPropObj, arrFromFirebase, sectionTitle, arrName, uniqueKey }) => {
    // const {arrFromFirebase,sectionTitle,arrName,uniqueKey} = dataObj;

    return (
        <>
            <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 1em', height: styles?.height, margin: styles?.margin ?? '1em 0 0 0', border: styles?.border, width: styles?.width }} >

                <FlexContainer grid={12} styles={{ justifyContent: 'start' }}><DynamicTitle text={sectionTitle} styles={{ padding: '0 0 0.3em 0' }} /></FlexContainer>

                <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                    <FlexContainer grid={ 6} >
                    <ArticlesSection arrToMap={arrFromFirebase || []} useFormPropObj={useFormPropObj} uniqueKey={uniqueKey} arrName={arrName ?? 'testArrName'} />
                        {/* <CustomDynamicAccordion arrToMap={arrFromFirebase || []} useFormPropObj={useFormPropObj} uniqueKey={uniqueKey} arrName={arrName ?? 'testArrName'} /> */}
                        {/* <DynamicAccordion arrFromFirebase={arrFromFirebase} uniqueKey={uniqueKey} arrName={arrName ?? 'testArrName'} useFormPropObj={useFormPropObj} /> */}
                    </FlexContainer>
                </FlexContainer>
            </ChipContainer>
        </>
    )
}

export default HomeArticleSection