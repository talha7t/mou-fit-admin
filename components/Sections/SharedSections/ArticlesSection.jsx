import React, { useEffect, useState } from 'react'
import { Box, Accordion, AccordionSummary, Typography, IconButton, AccordionDetails, Button } from '@mui/material';
import ImageContainerWithBtns from '@/components/Sections/SharedSections/ImageContainerWithBtns';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';
import TextAreaComp from '@/components/Widgets/SharedWidgets/TextArea/TextAreaComp';
import { AiOutlineDown } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';


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

const ArticlesSection = ({  dataObj, arrToMap, useFormPropObj, uniqueKey, arrName }) => {

  function mergeArrays(oldArray, updatedArray) {
    const mergedArray = oldArray.map((oldObj, index) => {
      if (updatedArray) {
        if (updatedArray[index] && Object.keys(updatedArray[index]).length > 0) {
          return updatedArray[index];
        } else {
          return oldObj;
        }

      }
    });

    return mergedArray;
  }
  const handleDynamicTitleChange = (targetStr, data) => {
    // console.log(targetStr)
    // console.log(data)
    useFormPropObj?.setValue(`${targetStr}`, data);
    console.log(tempArrToMap)
    console.log(useFormPropObj?.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`))
    console.log(mergeArrays(tempArrToMap, useFormPropObj?.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`)))
    useFormPropObj?.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`, mergeArrays(tempArrToMap, useFormPropObj?.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`)));

  };

  const appendObjToArr = () => {
    let tempArr = tempArrToMap || [];
    // tempArr.push({ title: '', description: '', imgUrl: 'https://via.placeholder.com/300x200?text=No+Image' })
    tempArr.push({ captionArticles: '', titleArticles: '', paraArticle: '', imgUrl: 'https://via.placeholder.com/300x200?text=No+Image' })

    // useFormPropObj.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`, tempArr)
    // console.log(tempArr)
    console.log(tempArr)
    console.log(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`)
    console.log(useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`))
    // if (testCondition) {
    //   useFormPropObj?.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`, tempArr);
    //   // setTempArrToMap(tempArr)

    // } else {
      useFormPropObj?.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`, mergeArrays(tempArr, useFormPropObj?.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`)));
      // setTempArrToMap(tempArr)

    // }
    console.log(useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`))

    // console.log(useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`))
    // setTempArrToMap(useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`));
    // console.log(tempArrToMap)
  };

  const handleDelete = (index) => {

    try {
      // @@ COMMENT THIS LINE IN CASE OF ANY 
      // @@ ISSUE WHILE DELETE ACTION !! 
      //   useFormPropObj.remove(index);

      if (uniqueKey) {
        const tempArr = tempArrToMap;
        // console.log('arrToMap',arrToMap)
        const filteredArr = tempArr.filter((_, i) => i !== index);
        // console.log('filteredArr',filteredArr)
        // arrToMap = filteredArr
        // console.log('arrToMap AFTER',arrToMap)
        setTempArrToMap(filteredArr)
        useFormPropObj.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`, filteredArr);

        //  console.log('imgs ARR', tempArr)
        //  console.log(filteredArr)
      };

    } catch (error) {
      console.error(error);
    };

  };
  const [tempArrToMap, setTempArrToMap] = useState(arrToMap)
  useEffect(() => {
    setTempArrToMap(arrToMap)
  }, [])

  // console.log(arrToMap)
  return (
    <Box mt={2} width={'95%'}
    // height={'100%'}
    >
      {tempArrToMap?.map((field, index) => (
        <Accordion key={field.id} sx={styles.accordion}>
          <AccordionSummary
            expandIcon={<AiOutlineDown color='rgb(196, 196, 196)' />}
            sx={styles.accordionSummary}
          >
            <Typography sx={{ margin: 0 }}>Icon {index + 1}</Typography>
            {/* {index === useFormPropObj.fields.length - 1 && */}
            <IconButton onClick={() => handleDelete(index)} sx={styles.deleteIcon}>
              <FaTrash />

            </IconButton>
            {/* } */}
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            <Box display="flex" flexDirection="column" width="100%">
              <InputFieldComp
                dataObj={{
                  // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
                //   target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].title` : dataObj?.inputTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.inputTarget}` : `accordions.${index}.title`,
                  target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].captionArticles` : `accordions.${index}.captionArticles`,

                  placeholder: dataObj?.placeholder ?? 'Main Headline',
                  label: dataObj?.placeholder ?? 'Main Headline',
                  isArr: true,
                  value: field.captionArticles,
                  onClick: handleDynamicTitleChange
                }}
                uniqueKey={uniqueKey}
                styles={{ margin: '0.7em 0 0 0', width: '95%' }}

                useFormPropObj={useFormPropObj}
              />

<InputFieldComp
                dataObj={{
                  // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
                  target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].titleArticles` : `accordions.${index}.titleArticles`,
                  placeholder: dataObj?.placeholder ?? 'Main Headline',
                  label: dataObj?.placeholder ?? 'Main Headline',
                  isArr: true,
                  value: field.titleArticles,
                  onClick: handleDynamicTitleChange
                }}
                uniqueKey={uniqueKey}
                styles={{ margin: '0.7em 0 0 0', width: '95%' }}

                useFormPropObj={useFormPropObj}
              />
              
              <InputFieldComp
                dataObj={{
                  // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
                  target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].btnTextArticle` : `accordions.${index}.btnTextArticle`,
                  placeholder: dataObj?.placeholder ?? 'Button Text',
                  label: dataObj?.placeholder ?? 'Button Text',
                  isArr: true,
                  value: field.btnTextArticle,
                  onClick: handleDynamicTitleChange
                }}
                uniqueKey={uniqueKey}
                styles={{ margin: '0.7em 0 0 0', width: '95%' }}
                useFormPropObj={useFormPropObj}
              />

              <InputFieldComp
                dataObj={{
                  // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
                  target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].btnLinkArticle` : `accordions.${index}.btnLinkArticle`,
                  placeholder: dataObj?.placeholder ?? 'Button Link',
                  label: dataObj?.placeholder ?? 'Button Link',
                  isArr: true,
                  value: field.btnLinkArticle,
                  onClick: handleDynamicTitleChange
                }}
                uniqueKey={uniqueKey}
                styles={{ margin: '0.7em 0 0 0', width: '95%' }}
                useFormPropObj={useFormPropObj}
              />

              <Box my={1}>
                <TextAreaComp
                  dataObj={{
                    // target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].paraArticle` : dataObj?.descriptionTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.descriptionTarget}` : `accordions.${index}.paraArticle`,
                    target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].paraArticle` : `accordions.${index}.paraArticle`,

                    isArr: true,
                    value: field?.paraArticle ?? '',

                    onClick: handleDynamicTitleChange
                  }}
                  useFormPropObj={useFormPropObj}
                />
              </Box>
              <Box my={1}>

                <ImageContainerWithBtns
                  imageSrc={uniqueKey ? useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].imgUrl`) : useFormPropObj?.getValues(`${dataObj?.imgTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.imgTarget}` : `accordions.${index}.imgUrl`}`)}

                  target={uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].imgUrl` : dataObj?.imgTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.imgTarget}` : `accordions.${index}.imgUrl`}
                  placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"
                  // onImageChange={handleImageChange}
                  // onImageRemove={handleImageRemove}
                  index={index}
                  useFormPropObj={useFormPropObj}

                // imgStyles={{ btnColor: 'black' }}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box mt={2} sx={{ alignSelf: 'end' }}>
        <Button variant="outlined" onClick={() => appendObjToArr()}>Add Accordion</Button>

        {/* <Button variant="outlined" onClick={() => uniqueKey ? appendObjToArr() : useFormPropObj.append(dataObj?.appendObj ?? { title: '', description: '', imgUrl: '' })}>Add Accordion</Button> */}
        {/* <Button variant="outlined" onClick={() => useFormPropObj.append(dataObj?.appendObj ?? { title: '', description: '', imgUrl: '' })}>Add Accordion</Button> */}

      </Box>
    </Box>
  );
}

export default ArticlesSection