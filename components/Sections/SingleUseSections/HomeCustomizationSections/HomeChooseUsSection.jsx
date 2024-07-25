import React from 'react';

import DynamicAccordion from '@/components/Widgets/SharedWidgets/Accordion/DynamicAccordion';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import InputRichTextEditorAndImgSection from '../../SharedSections/InputRichTextEditorAndImgSection';
import CustomDynamicAccordion from '@/components/Widgets/SharedWidgets/Accordion/CustomDynamicAccordion';
import InputsStackComp from '@/components/Widgets/SharedWidgets/InputFields/InputsStackComp';


const HomeChooseUsSection = ({ targetArr, useFormPropObj, uniqueKey, arrName, body, arrFromFirebase, grid, styles, sectionTitle }) => {

  return (
    <>
      <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 1em', height: styles?.height, margin: styles?.margin ?? '1em 0 0 0', border: styles?.border, width: styles?.width }} >

        {/* TITLE */}
        <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
          <DynamicTitle text={sectionTitle } styles={{ padding: '0 0 0.3em 0' }} />
        </FlexContainer>
        <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>

          {targetArr && (
            <InputsStackComp grid={12}
              styles={{ alignItems: styles?.alignItems }}
              dataObj={{ arrToMap: targetArr }}
              useFormPropObj={useFormPropObj} />

          )}
        </FlexContainer>
        <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
          <FlexContainer grid={grid ?? 6} >
            <CustomDynamicAccordion arrToMap={arrFromFirebase || []} useFormPropObj={useFormPropObj} uniqueKey={uniqueKey} arrName={arrName ?? 'testArrName'} />
            {/* <DynamicAccordion arrFromFirebase={arrFromFirebase} uniqueKey={uniqueKey} arrName={arrName ?? 'testArrName'} useFormPropObj={useFormPropObj} /> */}
          </FlexContainer>
        </FlexContainer>
      </ChipContainer>

    </>
  )
};


export default HomeChooseUsSection;