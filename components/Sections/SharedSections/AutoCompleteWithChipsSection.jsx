import { getUniqueArray } from '@/components/Helpers/GlobalFuncs/arrFuncs';
import ChipContainerSection from '@/components/Sections/SharedSections/ChipContainerSection';
import DynamicAutoComplete from '@/components/Widgets/SharedWidgets/AutoCompleteFields/DynamicAutoComplete';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import { TextField, Chip, Grid, IconButton, Autocomplete } from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';


import { FaCross } from 'react-icons/fa';

const AutoCompleteWithChipsSection = ({ dataObj, gridObj, useFormPropObj, styles }) => {
    const { getValues, setValue, formName, watch } = useFormPropObj;

    let tempArr = getValues(`${formName}.${dataObj.target}`);

    const handleDelete = (itemToDelete) => () => {
        const filteredArr = tempArr.filter((item) => item !== itemToDelete);
        setValue(`${formName}.${dataObj.target}`, filteredArr);
        if (dataObj?.uniqueKey) {
            setValue(`${dataObj?.uniqueKey}`, filteredArr);

        }

    };

    return (
        <>

            <Grid item xs={12} sx={{
                display: 'flex',
                paddingTop: '0.5em',

            }} >
                <Grid item md={gridObj?.title?.md ?? 2.2} lg={gridObj?.title?.lg ?? 1.5} >
                    <DynamicTitle text={dataObj?.title ?? 'Select Service'} styles={{ fontSize: '12px', padding: '0.5em 0 0 2em' }} />
                </Grid>

                <Grid item md={gridObj?.md ?? 8}  >
                    <DynamicAutoComplete
                        dataObj={{
                            optionsList: dataObj?.optionsList,
                            label: '',
                            target: dataObj.target,
                            uniqueKey: `${dataObj?.uniqueKey}`
                        }}
                        useFormPropObj={useFormPropObj}
                        styles={{ width: styles?.width }}
                    />

                    <ChipContainerSection dataObj={{
                        arrForMap: getValues(`${formName}.${dataObj.target}`),
                        handleDelete,
                    }}
                    />
                </Grid>
            </Grid>

        </>
    );
};


export default AutoCompleteWithChipsSection;
