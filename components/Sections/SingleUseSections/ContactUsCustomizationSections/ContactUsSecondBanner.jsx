import DynamicAccordionWithTwoInputs from '@/components/Widgets/SharedWidgets/Accordion/DynamicAccordionWithTwoInputs';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import React from 'react'

const ContactUsSecondBanner = ({useFormPropObj, accordionGrid, arrStr}) => {
  return (
    <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', margin: '1em 0 0 0'  }} >
    <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
        <DynamicTitle text={'Banner 01'} styles={{ padding: '0 0 0.3em 1em' }} />
    </FlexContainer>
    <FlexContainer grid={accordionGrid ?? 6} styles={{padding: '0 1em'}} >

    <DynamicAccordionWithTwoInputs dataObj={{
        arrStr: arrStr ?? 'accordions',
        firstTarget: arrStr ? `${arrStr}.question` : 'question',
        secondTarget: arrStr ? `${arrStr}.answer` : 'answer',
        imgTarget: arrStr ? `${arrStr}.imgUrl` :  'imgUrl',
        appendObj: {
            question: '',
            answer: '',
            imgUrl: '',
        }
    }} useFormPropObj={useFormPropObj} />
    </FlexContainer>
</ChipContainer>
  )
}

export default ContactUsSecondBanner;