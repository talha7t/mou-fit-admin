import React from 'react';
import { FaTrash, FaExpand } from 'react-icons/fa';
import { AiOutlineDown } from 'react-icons/ai';
import { Button, IconButton, Typography, Box, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import InputFieldComp from '../InputFields/InputFieldComp';
import ImageContainerWithBtns from '@/components/Sections/SharedSections/ImageContainerWithBtns';


const styles = {
    accordion: {
        // backgroundColor: 'rgb(23, 24, 33)',
        // marginBottom: '8px',
        width: '100%',
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
        visibility: 'hidden',
        marginLeft: 'auto',
        '&.expanded': {
            visibility: 'visible',
        },
    },
};

const DynamicAccordionWithTwoInputs = ({ dataObj, useFormPropObj, children }) => {

    // const {setValue} = useFormPropObj

    const handleDelete = (index) => {
        useFormPropObj.remove(index);
    };

    const handleDynamicFieldChange = (targetStr, data) => {
        useFormPropObj?.setValue(`${targetStr}`, data)
    };

    return (
        <Box mt={2} width={'100%'}>
            {useFormPropObj?.fields?.map((field, index) => (
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
                                    arrStr: dataObj?.arrStr ?? 'accordions',
                                    target: dataObj?.firstTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.firstTarget}` : `accordions.${index}.question`,
                                    placeholder: dataObj?.placeholder ?? 'Question',
                                    label: dataObj?.placeholder ?? 'Question',
                                    isArr: true,
                                    onClick: handleDynamicFieldChange
                                }}
                                styles={{ margin: '0.7em 0 0 0', width: '95%' }}

                                useFormPropObj={useFormPropObj}
                            />

                            <InputFieldComp
                                dataObj={{
                                    arrStr: dataObj?.arrStr ?? 'accordions',
                                    target: dataObj?.secondTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.secondTarget}` : `accordions.${index}.answer`,
                                    placeholder: dataObj?.placeholder ?? 'Answer',
                                    label: dataObj?.placeholder ?? 'Answer',
                                    isArr: true,
                                    onClick: handleDynamicFieldChange
                                }}
                                styles={{ margin: '0.7em 0 0 0', width: '95%' }}

                                useFormPropObj={useFormPropObj}
                            />

                            {children}
                            {
                                dataObj?.imgTarget && <Box my={1}>
                                    <ImageContainerWithBtns
                                        imageSrc={useFormPropObj?.getValues(`${dataObj?.imgTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.imgTarget}` : `accordions.${index}.imgUrl`}`)}

                                        target={dataObj?.imgTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.imgTarget}` : `accordions.${index}.imgUrl`}
                                        placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"
                                        // onImageChange={handleImageChange}
                                        // onImageRemove={handleImageRemove}
                                        index={index}
                                        useFormPropObj={useFormPropObj}

                                        imgStyles={{ btnColor: 'black' }}
                                    />
                                </Box>
                            }

                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Box mt={2}>
                <Button variant="outlined" onClick={() => useFormPropObj.append(dataObj?.appendObj ?? { title: '', description: '', imgUrl: '' })}>Add New</Button>
            </Box>
        </Box >
    );
};

export default DynamicAccordionWithTwoInputs;
