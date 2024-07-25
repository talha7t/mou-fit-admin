import React from 'react';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import DynamicAccordionWithTwoInputs from '@/components/Widgets/SharedWidgets/Accordion/DynamicAccordionWithTwoInputs';

const SubscriptionFourthSection = ({ useFormPropObj, uniqueKey }) => {
    return (
        <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0' }} >
            <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                <DynamicTitle text={'FAQs'} styles={{ padding: '0 0 0.3em 1em' }} />
            </FlexContainer>
            <FlexContainer grid={6} styles={{ padding: '0 1.5em', flexDirection: 'column' }} >

                <InputFieldComp
                    dataObj={{
                        placeholder: 'Title',
                        target: 'fourthBanner.title',
                        label: 'Title'
                    }}
                    styles={{ margin: '0.7em 0 0 0', width: '97%' }}
                    useFormPropObj={useFormPropObj}
                />
                <InputFieldComp
                    dataObj={{
                        placeholder: 'Description',
                        target: 'fourthBanner.description',
                        label: 'Description'
                    }}
                    styles={{ margin: '0.7em 0 0 0', width: '97%' }}
                    useFormPropObj={useFormPropObj}
                />

                <DynamicAccordionWithTwoInputs dataObj={{
                    arrStr: 'faqs',
                    firstTarget: 'question',
                    secondTarget: 'answer',
                    // imgTarget: 'imgUrl',
                    appendObj: {
                        question: '',
                        answer: '',
                        // imgUrl: '',
                    }
                }} useFormPropObj={useFormPropObj} />

            </FlexContainer>
        </ChipContainer>
    )
};

export default SubscriptionFourthSection;