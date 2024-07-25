import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import React from 'react';
import DropdownWithTitleSection from '../../SharedSections/DropdownWithTitleSection';
import AutoCompleteWithChipsSection from '../../SharedSections/AutoCompleteWithChipsSection';


const blogsOptionList = [
    { label: 'Blog 1', value: 'blog1' },
    { label: 'Blog 2', value: 'blog2' },
    { label: 'Blog 3', value: 'blog3' },
    { label: 'Blog 4', value: 'blog4' },
];

const SubscriptionThirdBanner = ({ useFormPropObj, uniqueKey }) => {

    return (

        <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', margin: '1em 0 ' }} >

            <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                <DynamicTitle text={'Plans'} styles={{ padding: '0 0 0.3em 1.4em' }} />
            </FlexContainer>

            <DropdownWithTitleSection
            title={'Plans Shown'}
                // titleObj={{ md: 2.2, lg: 1.5, title: 'Blog Shown' }}
                // titleStyles={{ justifyContent: 'start', fontSize: '12px', padding: '0 0 0 2em' }}
                fieldObj={{ md: 1, lg: 2, xl: 1.5, target: 'thirdBanner.plansCount' }}
                styles={{ justifyContent: 'start', md: 2.2, lg: 1.5 }}
                useFormPropObj={useFormPropObj}
            />

            <AutoCompleteWithChipsSection
                dataObj={{
                    title: 'Select Plan',
                    label: "Label",
                    target: "thirdBanner.selectedPlans",
                    optionsList: blogsOptionList,
                    arrToMap: [],
                    value: useFormPropObj.getValues(`${useFormPropObj.formName}.thirdBanner.selectedPlans`)
                }}
                useFormPropObj={useFormPropObj}

            />
        </ChipContainer>
    )
}

export default SubscriptionThirdBanner;