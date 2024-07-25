import { getUniqueArray } from '@/components/Helpers/GlobalFuncs/arrFuncs';
import ChipContainerSection from '@/components/Sections/SharedSections/ChipContainerSection';
import { TextField, Chip, Grid, IconButton, Autocomplete } from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';


import { FaCross } from 'react-icons/fa';

const DynamicAutoComplete = ({ dataObj, useFormPropObj, styles }) => {

  const { getValues, setValue, formName, watch } = useFormPropObj;

  let tempArr = getValues(`${formName}.${dataObj.target}`) || [];

  const handleSelected = (e, value) => {
    if (value && !tempArr?.includes(value)) {
      const filteredArr = [...tempArr, value];
      setValue(`${formName}.${dataObj.target}`, filteredArr);
      if(dataObj?.uniqueKey){
        setValue(`${dataObj?.uniqueKey}`, filteredArr);
      }

    };
  };

  return (
    <>
      <Autocomplete
        sx={{
          width: styles?.width ?? '90%',
          '& .MuiFormControl-root > div': {
            padding: '0 0 0 0.4em',
          },
          '& .MuiOutlinedInput-root': {
            '& .MuiAutocomplete-endAdornment .MuiSvgIcon-root': {
              color: '#C4C4C4',
            },
            '& fieldset': {
              borderColor: '#C4C4C4',
            },
            '&:hover fieldset': {
              // borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              // borderColor: 'white',
            },
            '& input': {
              color: '#C4C4C4',
            },
          },
        }}
        options={dataObj?.optionsList}
        getOptionLabel={(option) => option?.label || ''}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        onChange={handleSelected}
        value={null}
        renderInput={(params) => (
          <TextField {...params} label={dataObj.label} fullWidth />
        )}
      />
    </>
  );
};


export default DynamicAutoComplete;
