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

const HomeBlogSection = ({useFormPropObj, uniqueKey}) => {
    return (

        <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', margin: '1em 0 ' }} >

            <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                <DynamicTitle text={'Blog'} styles={{ padding: '0 0 0.3em 1.4em' }} />
            </FlexContainer>

            <DropdownWithTitleSection
                // titleObj={{ md: 2.2, lg: 1.5, title: 'Blog Shown' }}
                // titleStyles={{ justifyContent: 'start', fontSize: '12px', padding: '0 0 0 2em' }}
                fieldObj={{ md: 1, lg: 2, xl: 1.5, target: `${uniqueKey}.blogCount` }}
                styles={{ justifyContent: 'start', md: 2.2, lg: 1.5 }}
                useFormPropObj={useFormPropObj}
            />
            
            <AutoCompleteWithChipsSection
                dataObj={{
                    title: 'Select Blog',
                    label: "Label",
                    target: `blogBannerObj.selectedBlogs`,
                    optionsList: blogsOptionList,
                    arrToMap: [],
                    value: useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.selectedBlogs`),
                    // title: 'Select Service',
                    // label: "Label",
                    // target: "servicesBannerObj.selectedServices",
                    // optionsList: serviceOptionList,
                    // arrToMap: [],
                    // value: useFormPropObj.getValues(`${useFormPropObj.formName}.servicesBannerObj.selectedServices`),
                    uniqueKey: `${useFormPropObj.formName}.${uniqueKey}.selectedServices`
                }}
                useFormPropObj={useFormPropObj}
                
            />
        </ChipContainer>
    )
}

export default HomeBlogSection