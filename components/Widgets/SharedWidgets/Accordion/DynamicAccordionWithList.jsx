import React, { useEffect } from 'react';
import { FaTrash, FaExpand } from 'react-icons/fa';
import { AiOutlineDown } from 'react-icons/ai';
import { Button, IconButton, Typography, TextField, TextareaAutosize, Box, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import InputFieldComp from '../InputFields/InputFieldComp';
import TextAreaComp from '../TextArea/TextAreaComp';
import ImageContainerWithBtns from '@/components/Sections/SharedSections/ImageContainerWithBtns';

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

// @@ RECEIVE UNIQUE KEY HERE !
// @@ FINAL => uniqueKey.arrName[index].targetName 
// REMOVE FROM  uniqueKey.arrName[index]
// ADD TO uniqueKey.arrName[index] 
const DynamicAccordionWithList = ({ dataObj, useFormPropObj, uniqueKey, arrName, body }) => {

    // const {getValues, setValue, remove} = useFormPropObj
    // const {setValue} = useFormPropObj

    // const arrName = Ar ?? 'imgs_arr';


    const handleDynamicTitleChange = (targetStr, data) => {
        useFormPropObj?.setValue(`${targetStr}`, data);
    };

    const handleDynamicDescChange = (targetStr, data) => {
        useFormPropObj?.setValue(`${targetStr}`, data);
    };

    const handleImageChange = (src, str, i) => {
        // setValue(`${formName}.${dataObj?.imgTarget ?? 'bannerImg'}`, src)
        console.log(src)
        console.log(str)
        console.log(i)


        useFormPropObj?.setValue(`${str}`, src)
    };

    const handleImageRemove = (str) => {
        console.log(str)

        // setValue(`${formName}.${dataObj?.imgTarget ?? 'bannerImg'}`, '')
        useFormPropObj?.setValue(`${str}`, '')

    };

    const appendObjToArr = () => {

        // @@ COMMENT THIS LINE IN CASE OF ANY 
        // @@ ISSUE WHILE APPEND ACTION !! 
        useFormPropObj.append(dataObj?.appendObj ?? { title: '', description: '', imgUrl: '', features: [] })

        let tempArr = useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`) || [];
        tempArr.push(dataObj?.appendObj ?? { title: '', description: '', imgUrl: '', features: [] });
        useFormPropObj.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`, tempArr);

    }

    const handleDelete = (index) => {

        try {
            // @@ COMMENT THIS LINE IN CASE OF ANY 
            // @@ ISSUE WHILE DELETE ACTION !! 
            useFormPropObj.remove(index);

            if (uniqueKey) {
                const tempArr = useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`);
                const filteredArr = tempArr.filter((_, i) => i !== index);
                useFormPropObj.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`, filteredArr);
                //  console.log('imgs ARR', tempArr)
                //  console.log(filteredArr)
            };

        } catch (error) {
            console.error(error);
        };

    };

    useEffect(() => {
        // console.log(`${useFormPropObj.formName}.${uniqueKey}`)
        // console.log(useFormPropObj?.getValues(`${useFormPropObj.formName}.${uniqueKey}`))
        if (!useFormPropObj?.getValues(`${useFormPropObj.formName}.${uniqueKey}`)) {
            appendObjToArr();
        }
    }, [])

    return (
        <Box mt={2} width={'95%'}>
            {(useFormPropObj?.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`) ?? useFormPropObj?.fields)?.map((field, index) => (
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
                                    target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.title` : dataObj?.inputTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.inputTarget}` : `accordions.${index}.title`,
                                    placeholder: dataObj?.placeholder ?? 'Main Headline',
                                    label: dataObj?.placeholder ?? 'Main Headline',
                                    isArr: true,
                                    // value: ,
                                    onClick: handleDynamicTitleChange
                                }}
                                valFromFirebase={body?.title}
                                uniqueKey={uniqueKey}
                                styles={{ margin: '0.7em 0 0 0', width: '95%' }}

                                useFormPropObj={useFormPropObj}
                            />

                            <Box my={1}>
                                <TextAreaComp
                                    dataObj={{
                                        target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].description` : dataObj?.descriptionTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.descriptionTarget}` : `accordions.${index}.description`,
                                        isArr: true,
                                        onClick: handleDynamicDescChange
                                    }}
                                    useFormPropObj={useFormPropObj}
                                />
                            </Box>
                            {/* @@ DYNAMIC LIST */}
                            <Box my={1}>
                                {useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].features`)?.map((item, ind) => {
                                    return <>
                                        <InputFieldComp
                                            dataObj={{
                                                // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
                                                //   target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].title` : dataObj?.inputTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.inputTarget}` : `accordions.${index}.title`,
                                                target: `${useFormPropObj.formName}.${uniqueKey}.plans_section[${index}].features[${ind}]`,

                                                placeholder: dataObj?.placeholder ?? 'Main Headline',
                                                label: dataObj?.placeholder ?? 'Main Headline',
                                                isArr: true,
                                                onClick: handleDynamicTitleChange
                                            }}
                                            valFromFirebase={body.plans_section[index].features[ind]}
                                            uniqueKey={uniqueKey}
                                            styles={{ margin: '0.7em 0 0 0', width: '95%' }}

                                            useFormPropObj={useFormPropObj}
                                        />
                                    </>
                                })}
                            </Box>
                            <Button onClick={() => {
                                let tempArr = useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].features`) || [];
                                console.log(tempArr);
                                tempArr.push('');
                                useFormPropObj.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].features`, tempArr)
                            }}>
                                ADD list item
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Box mt={2}>
                <Button variant="outlined" onClick={() => uniqueKey ? appendObjToArr() : useFormPropObj.append(dataObj?.appendObj ?? { title: '', description: '', imgUrl: '' })}>Add Accordion</Button>
                {/* <Button variant="outlined" onClick={() => useFormPropObj.append(dataObj?.appendObj ?? { title: '', description: '', imgUrl: '' })}>Add Accordion</Button> */}

            </Box>
        </Box>
    );
};

export default DynamicAccordionWithList;
