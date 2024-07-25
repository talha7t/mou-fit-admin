import React from 'react';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import SingleDropdown from '@/components/Widgets/SharedWidgets/Dropdown/SingleDropdown';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import { Grid } from '@mui/material';

const DropdownWithTitleSection = ({ grid,gridObj, title, fieldObj, titleStyles, styles, useFormPropObj }) => {
    return (

        <FlexContainer grid={grid ?? 12} styles={{ justifyContent: styles?.justifyContent ?? 'start' }}>

            <Grid item md={gridObj?.title?.md ?? 2.2} lg={gridObj?.title?.lg ?? 1.5} >
            <DynamicTitle text={title ?? 'Services Shown'} styles={{ padding: titleStyles?.padding ?? '0 0 0 2em', fontSize: titleStyles?.fontSize ?? '12px' }} />
            </Grid>

            <FlexContainer gridMd={fieldObj?.md ?? 3} gridLg={fieldObj?.lg ?? 2} gridXl={fieldObj?.xl ?? 1.5}  >
                <SingleDropdown
                    dataObj={{
                        target: fieldObj?.target ?? 'servicesBannerObj.servicesCount',
                        // label: '',
                    }}
                    useFormPropObj={useFormPropObj}
                />
            </FlexContainer>

        </FlexContainer>
    )
};

export default DropdownWithTitleSection;