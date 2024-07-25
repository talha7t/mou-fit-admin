import React from 'react';
import { OutlinedInput, TextField } from '@mui/material';

const InputFieldComp = ({ dataObj, useFormPropObj, styles, uniqueKey, valFromFirebase }) => {

  const { formName, register, getValues, setValue } = useFormPropObj;

  const targetName = dataObj?.isArr ? "" : `${formName}.`;
// console.log(dataObj )
  return (
    <TextField
      type={dataObj?.fieldType ?? 'text'}
      {...register(`${targetName}${dataObj?.target}`)}
      // value={`${getValues(`${targetName}${dataObj?.target}`)}` ?? ""}
      // value={dataObj?.value ?? `${getValues(`${targetName}${dataObj?.target}`)}` === 'undefined' ? '' :  `${getValues(`${targetName}${dataObj?.target}`)}` ?? ''}
      // value={`${getValues(`${targetName}${dataObj?.target}`)}` === 'undefined' ? '' : `${getValues(`${targetName}${dataObj?.target}`)}` ?? ''}
      value={valFromFirebase ?? getValues(`${targetName}${dataObj?.target}`) ?? dataObj?.value }

      name={`${targetName}${dataObj?.target}`}
      onChange={e => dataObj?.onClick ? dataObj?.onClick(dataObj?.target, e.target.value) : setValue(`${formName}.${dataObj?.target}`, `${e.target.value}`)}
      // onChange={e => {
      //   console.log(getValues(`${targetName}${dataObj?.target}`))
      //   console.log(`${e.target.value}`)
      //   setValue(`${formName}.${dataObj?.target}`, `${e.target.value}`)}}

      placeholder={ dataObj?.value ?? dataObj?.placeholder ?? 'text'}
      disabled={dataObj?.isDisabled ?? false}
      sx={{
        width: styles?.width ?? '90%',
        margin: styles?.margin,
        padding: styles?.padding,
        "& .MuiInputBase-input": {
          color: styles?.color ?? 'white',
          width: styles?.width ?? '95%',
        },

        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: '#C4C4C4',
        }
      }}
      label={
        <span style={{ color: styles?.labelColor ?? '#C4C4C4' }}>
          {dataObj?.label}
        </span>
      }

      inputProps={{
        style: {
          padding: 9.5,
          color: styles?.color ?? '#C4C4C4',
          width: styles?.innerWidth ?? '98%',
        },
      }}
      InputProps={{
        readOnly: dataObj?.isReadOnly ?? false
      }}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
    />
    // @@ USE data?.arrStr AS arrName[i] to use dynamic Str for registring input
    // <OutlinedInput
    //     {...register(`${data?.arrStr ?? formName + '.'}${data?.target ?? ''} `)}
    //     value={getValues(`${data?.arrStr ?? formName + '.'}${data?.target ?? ''} `) ?? ""}
    //     sx={{
    //         width: styles?.width ?? "95%",
    //         margin: styles?.margin ?? 0,
    //         fontSize: styles?.fontSize ?? '15px',
    //         color: 'white',
    //         borderColor: 'white'
    //     }}
    //     placeholder={data?.placeholder ?? "Type Here..."}
    //     size="small"
    //     variant="outlined"
    // />
  )
}

export default InputFieldComp;