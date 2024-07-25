import React from 'react';
import { TextareaAutosize } from '@mui/material';

const TextAreaComp = ({ dataObj, useFormPropObj, valFromFirebase }) => {
    const { formName, register, getValues, setValue } = useFormPropObj;

    return (
        <TextareaAutosize
            style={{
                padding: '5px',
                width: "95%",
                fontSize: '1em',
                borderRadius: '5px',
                margin: '1em 0',
                backgroundColor: 'rgb(23, 24, 33)',
                color: '#C4C4C4'
            }}
            {...register(`${dataObj?.isArr === true ? '' : formName + '.'}${dataObj?.target}`)}
            value={valFromFirebase ?? `${getValues(`${dataObj?.isArr === true ? '' : formName + '.'}${dataObj?.target}`)}` ?? ""}
            name={`${dataObj?.isArr === true ? '' : formName + '.'}${dataObj?.target}`}
            onChange={e => dataObj?.onClick ? dataObj?.onClick(dataObj?.target, e.target.value) : setValue(`${formName}.${dataObj?.target}`, `${e.target.value}`)}
            // onChange={e => dataObj?.onClick(dataObj?.target, e.target.value) ?? setValue(`${formName}.${dataObj?.target}`, `${e.target.value}`)}
            placeholder={dataObj?.placeholder ?? 'remarks'}

            minRows={6}

        />
    )
};

export default TextAreaComp;