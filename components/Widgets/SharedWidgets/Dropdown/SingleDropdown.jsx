import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const SingleDropdown = ({ dataObj, styles, useFormPropObj }) => {

    const { formName, register, getValues } = useFormPropObj;

    return (
        <TextField
            {...register(`${formName}.${dataObj?.target}`)}
            value={getValues(`${formName}.${dataObj?.target}`) ?? ""}
            disabled={dataObj?.readOnlyCheck ?? false}
            placeholder={dataObj?.placeholder ?? ''}
            label={dataObj?.label ?? ''}
            // className={'w-100 text-start'}
            sx={{
                width: styles?.width ?? '100%',
                textAlign: styles?.textAlign ?? 'start',
                margin: styles?.margin ?? '',
                '& .MuiInputLabel-root': {
                  color: '#C4C4C4'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#C4C4C4'
                  },
                  '&:hover fieldset': {
                    // borderColor: '#C4C4C4'
                  },
                  '&.Mui-focused fieldset': {
                    // borderColor: '#C4C4C4'
                  },
                  '& .MuiInputBase-input': {
                    color: '#C4C4C4'
                  },
                  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                    color: '#C4C4C4'
                  },
                  '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiSelect-icon.MuiSelect-iconOutlined.css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
                    color: '#C4C4C4'
                  }
                }
              }}
               
            InputLabelProps={{ shrink: true }}
            select
            fullWidth
            size="small"
        >
            {(dataObj?.arrToMap || ['no', 'option']).map((option, index) => (
                // <Tooltip key={index} title={hasTooltip ? option.desc ?? option ?? '' :  ''} >
                <MenuItem value={option?.title ?? option?.label ?? option ?? ''}
                    key={index}
                >
                    {option?.title ?? option?.label ?? option ?? ''}
                </MenuItem>
                // </Tooltip>
            ))}
        </TextField>
    )
}

export default SingleDropdown