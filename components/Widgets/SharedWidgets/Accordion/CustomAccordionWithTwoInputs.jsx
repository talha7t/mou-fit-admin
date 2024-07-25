import ImageContainerWithBtns from '@/components/Sections/SharedSections/ImageContainerWithBtns';
import { Box, Accordion, AccordionSummary, Typography, IconButton, AccordionDetails, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import TextAreaComp from '../TextArea/TextAreaComp';
import InputFieldComp from '../InputFields/InputFieldComp';

const styles = {
  accordion: {
    backgroundColor: '#171821',
    // marginBottom: '8px',
    boxShadow: 'none',
    '&::before': {
      display: 'none',
    },
    '&:not(:last-child)': {
      borderBottom: 'none',
    },
    '&.Mui-expanded': {
      margin: 0,
    },
  },
  accordionSummary: {

    backgroundColor: 'rgb(23, 24, 33)',
    color: 'rgb(196, 196, 196)',
    // borderRadius: '4px',
    margin: 0,
    borderBottom: '1px solid #C4C4C4',
    minHeight: '48px',
    '& .MuiAccordionSummary-content': {
      margin: ' 0',
      display: 'flex',
      alignItems: 'center',
      '& .MuiTypography-root': {
        // fontWeight: 600,
      },
    },
  },
  accordionDetails: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  deleteIcon: {
    // visibility: 'hidden',
    visibility: 'visible',

    marginLeft: 'auto',
    '&.expanded': {
      visibility: 'visible',
    },
  },
};

const CustomAccordionWithTwoInputs = ({ dataObj, useFormPropObj, target, isDesc }) => {

  const { getValues, formName, setValue } = useFormPropObj;
 

  const handleDelete = (index) => {
    let tempArr = getValues(`${formName}.${target ?? 'headSection.nav_data'}`)
    const filteredArr = tempArr.filter((_, i) => i !== index);
    console.log(filteredArr);
    setValue(`${formName}.${target ?? 'headSection.nav_data'}`, filteredArr)
    // console.log(getValues(`${formName}.headSection.nav_data`))
  }



  //   return (dataObj.headSection.nav_data ?? getValues(`${formName}.headSection.nav_data`) ?? []).map((x, i) => {
  return (getValues(`${formName}.${target ?? 'headSection.nav_data'}`) ?? []).map((x, i) => {
    return (
      <Accordion key={i} sx={styles.accordion}>
        <AccordionSummary
          expandIcon={<AiOutlineDown color="rgb(196, 196, 196)" />}
          sx={styles.accordionSummary}
        >
          <Typography sx={{ margin: 0 }}>Icon {i + 1}</Typography>
          {/* {index === useFormPropObj.fields.length - 1 && */}
          <IconButton onClick={() => handleDelete(i)} sx={styles.deleteIcon}>
            <FaTrash />
          </IconButton>
          {/* } */}
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails}>
          <Box display="flex" flexDirection="column" width="100%">
            <InputFieldComp
              dataObj={{
                placeholder: x.label ?? "",
                target: `${x.label ?? "bannerTitle"}`,
                target: `${target ?? 'headSection.nav_data'}[${i}].label`,

                // label: x.label ?? "",
                label: x.label === "" ? "New Item" : x.label ?? '',
              
              }}
              styles={{ margin: "0.7em 0 0 0", width: "97%" }}
              useFormPropObj={useFormPropObj}
            />

            <Box my={1}>
              <InputFieldComp
                dataObj={{
                  placeholder: x.desc ?? "",
                  // target: `${x.label ?? "bannerTitle"}`,
                  target: `${target ?? 'headSection.nav_data'}[${i}].${isDesc === true ? 'desc' :'link'}`,

                  // label: x.label === "" ? "New Item's Link" : `${x.label}'s Link` ?? '',
                  label: x.label === "" ? "New Item's Link" : `${x.label}'s ${isDesc === true ? 'Desc' :'Link'}` ?? '',

                }}
                styles={{ margin: "0.7em 0 0 0", width: "97%" }}
                useFormPropObj={useFormPropObj}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  });
  };

export default CustomAccordionWithTwoInputs