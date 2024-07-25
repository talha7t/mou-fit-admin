import React, { useEffect, useState } from "react";
import TextAreaComp from "../TextArea/TextAreaComp";
import InputFieldComp from "../InputFields/InputFieldComp";

import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  IconButton,
  AccordionDetails,
  Button,
} from "@mui/material";
import { AiOutlineDown } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const styles = {
  accordion: {
    backgroundColor: "#171821",
    // marginBottom: '8px',
    boxShadow: "none",
    "&::before": {
      display: "none",
    },
    "&:not(:last-child)": {
      borderBottom: "none",
    },
    "&.Mui-expanded": {
      margin: 0,
    },
  },
  accordionSummary: {
    backgroundColor: "rgb(23, 24, 33)",
    color: "rgb(196, 196, 196)",
    // borderRadius: '4px',
    margin: 0,
    borderBottom: "1px solid #C4C4C4",
    minHeight: "48px",
    "& .MuiAccordionSummary-content": {
      margin: " 0",
      display: "flex",
      alignItems: "center",
      "& .MuiTypography-root": {
        // fontWeight: 600,
      },
    },
  },
  accordionDetails: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
  },
  deleteIcon: {
    // visibility: 'hidden',
    visibility: "visible",

    marginLeft: "auto",
    "&.expanded": {
      visibility: "visible",
    },
  },
};

const CustomDynamicAccordionWithList = ({
  dataObj,
  arrToMap,
  useFormPropObj,
  uniqueKey,
  arrName,
  body,
}) => {
  console.log("body", body);
  function mergeArrays(oldArray, updatedArray) {
    const mergedArray = oldArray?.map((oldObj, index) => {
      if (updatedArray) {
        if (
          updatedArray[index] &&
          Object.keys(updatedArray[index])?.length > 0
        ) {
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
    console.log(tempArrToMap);
    console.log(
      useFormPropObj?.getValues(
        `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? "imgs_arr"}`
      )
    );
    console.log(
      mergeArrays(
        tempArrToMap,
        useFormPropObj?.getValues(
          `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? "imgs_arr"}`
        )
      )
    );
    useFormPropObj?.setValue(
      `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? "imgs_arr"}`,
      mergeArrays(
        tempArrToMap,
        useFormPropObj?.getValues(
          `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? "imgs_arr"}`
        )
      )
    );
  };

  const appendObjToArr = () => {
    let tempArr = tempArrToMap || [];
    tempArr.push({
      access: "",
      duration: "",
      plan: "",
      price: "",
      description: "",
      features: [],
      // plans_section : {features: []}
    });
    // useFormPropObj.append(dataObj?.appendObj ?? { title: '', description: '', imgUrl: 'https://via.placeholder.com/300x200?text=No+Image', features: [] })

    // useFormPropObj.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`, tempArr)
    // console.log(tempArr)
    console.log(tempArr);
    console.log(
      `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? "imgs_arr"}`
    );
    // console.log(useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`))
    // if (testCondition) {
    //   useFormPropObj?.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`, tempArr);
    //   // setTempArrToMap(tempArr)

    // } else {
    useFormPropObj?.setValue(
      `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? "imgs_arr"}`,
      tempArr
    );
    // setTempArrToMap(tempArr)

    // useFormPropObj?.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`, mergeArrays(tempArr, useFormPropObj?.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`)));
    setTempArrToMap(tempArr);

    // }
    console.log(
      useFormPropObj.getValues(
        `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? "imgs_arr"}`
      )
    );

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
        const tempArr = tempArrToMap || [];
        // console.log('arrToMap',arrToMap)
        const filteredArr = tempArr.filter((_, i) => i !== index);
        // console.log('filteredArr',filteredArr)
        // arrToMap = filteredArr
        // console.log('arrToMap AFTER',arrToMap)
        useFormPropObj?.setValue(
          `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? "imgs_arr"}`,
          filteredArr
        );

        // useFormPropObj.setValue(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}`, filteredArr);
        console.log(filteredArr);
        // setTempArrToMap(filteredArr)
        console.log(tempArrToMap);
        console.log(
          useFormPropObj.getValues(
            `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? "imgs_arr"}`
          )
        );
        setTempArrToMap(
          useFormPropObj.getValues(
            `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? "imgs_arr"}`
          )
        );

        //  console.log('imgs ARR', tempArr)
        //  console.log(filteredArr)
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [tempArrToMap, setTempArrToMap] = useState(arrToMap);
  useEffect(() => {
    setTempArrToMap(arrToMap);
  }, []);

  // console.log(arrToMap)
  return (
    <Box
      mt={2}
      width={"95%"}
      // height={'100%'}
    >
      <InputFieldComp
        dataObj={{
          // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
          target: uniqueKey
            ? `${useFormPropObj.formName}.${uniqueKey}.heading`
            : dataObj?.inputTarget
            ? `${dataObj?.arrStr}.${index}.${dataObj?.inputTarget}`
            : `accordions.${index}.title`,
          placeholder: dataObj?.placeholder ?? "Main Heading",
          label: dataObj?.placeholder ?? "Main Heading",
          isArr: true,
          value: useFormPropObj.getValues(
            `${useFormPropObj.formName}.${uniqueKey}.heading`
          ) ?? '',
          onClick: handleDynamicTitleChange,
        }}
        uniqueKey={uniqueKey}
        styles={{ margin: "0.7em 0 0 0", width: "95%" }}
        useFormPropObj={useFormPropObj}
      />
      <InputFieldComp
        dataObj={{
          // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
          target: uniqueKey
            ? `${useFormPropObj.formName}.${uniqueKey}.sub_heading`
            : dataObj?.inputTarget
            ? `${dataObj?.arrStr}.${index}.${dataObj?.inputTarget}`
            : `accordions.${index}.title`,
          placeholder: dataObj?.placeholder ?? "Sub-Heading",
          label: dataObj?.placeholder ?? "Sub-Heading",
          isArr: true,
          value: useFormPropObj.getValues(
            `${useFormPropObj.formName}.${uniqueKey}.sub_heading`
          ) ?? '',
          onClick: handleDynamicTitleChange,
        }}
        uniqueKey={uniqueKey}
        styles={{ margin: "0.7em 0 0 0", width: "95%" }}
        useFormPropObj={useFormPropObj}
      />
      <hr />

      {tempArrToMap?.map((field, index) => (
        <Accordion key={field.id} sx={styles.accordion}>
          <AccordionSummary
            expandIcon={<AiOutlineDown color="rgb(196, 196, 196)" />}
            sx={styles.accordionSummary}
          >
            <Typography sx={{ margin: 0 }}>Icon {index + 1}</Typography>
            {/* {index === useFormPropObj.fields.length - 1 && */}
            <IconButton
              onClick={() => handleDelete(index)}
              sx={styles.deleteIcon}
            >
              <FaTrash />
            </IconButton>
            {/* } */}
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            <Box display="flex" flexDirection="column" width="100%">
              <InputFieldComp
                dataObj={{
                  // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
                  target: uniqueKey
                    ? `${useFormPropObj.formName}.${uniqueKey}.${
                        arrName ?? "imgs_arr"
                      }[${index}].access`
                    : dataObj?.inputTarget
                    ? `${dataObj?.arrStr}.${index}.${dataObj?.inputTarget}`
                    : `accordions.${index}.title`,
                  placeholder: dataObj?.placeholder ?? "Main Headline",
                  label: dataObj?.placeholder ?? "Main Headline",
                  isArr: true,
                  value: field.title,
                  onClick: handleDynamicTitleChange,
                }}
                uniqueKey={uniqueKey}
                styles={{ margin: "0.7em 0 0 0", width: "95%" }}
                useFormPropObj={useFormPropObj}
              />

              <InputFieldComp
                dataObj={{
                  // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
                  target: uniqueKey
                    ? `${useFormPropObj.formName}.${uniqueKey}.${
                        arrName ?? "imgs_arr"
                      }[${index}].plan`
                    : dataObj?.inputTarget
                    ? `${dataObj?.arrStr}.${index}.${dataObj?.inputTarget}`
                    : `accordions.${index}.title`,
                  placeholder: dataObj?.placeholder ?? "Main Headline",
                  label: dataObj?.placeholder ?? "Main Headline",
                  isArr: true,
                  value: field.title,
                  onClick: handleDynamicTitleChange,
                }}
                uniqueKey={uniqueKey}
                styles={{ margin: "0.7em 0 0 0", width: "95%" }}
                useFormPropObj={useFormPropObj}
              />

              <InputFieldComp
                dataObj={{
                  // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
                  target: uniqueKey
                    ? `${useFormPropObj.formName}.${uniqueKey}.${
                        arrName ?? "imgs_arr"
                      }[${index}].price`
                    : dataObj?.inputTarget
                    ? `${dataObj?.arrStr}.${index}.${dataObj?.inputTarget}`
                    : `accordions.${index}.title`,
                  placeholder: dataObj?.placeholder ?? "Main Headline",
                  label: dataObj?.placeholder ?? "Main Headline",
                  isArr: true,
                  value: field.title,
                  onClick: handleDynamicTitleChange,
                }}
                uniqueKey={uniqueKey}
                styles={{ margin: "0.7em 0 0 0", width: "95%" }}
                useFormPropObj={useFormPropObj}
              />

              <InputFieldComp
                dataObj={{
                  // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
                  target: uniqueKey
                    ? `${useFormPropObj.formName}.${uniqueKey}.${
                        arrName ?? "imgs_arr"
                      }[${index}].duration`
                    : dataObj?.inputTarget
                    ? `${dataObj?.arrStr}.${index}.${dataObj?.inputTarget}`
                    : `accordions.${index}.title`,
                  placeholder: dataObj?.placeholder ?? "Main Headline",
                  label: dataObj?.placeholder ?? "Main Headline",
                  isArr: true,
                  value: field.title,
                  onClick: handleDynamicTitleChange,
                }}
                uniqueKey={uniqueKey}
                styles={{ margin: "0.7em 0 0 0", width: "95%" }}
                useFormPropObj={useFormPropObj}
              />

              <Box my={1}>
                {useFormPropObj
                  .getValues(
                    `${useFormPropObj.formName}.${uniqueKey}.${
                      arrName ?? "imgs_arr"
                    }[${index}].features`
                  )
                  ?.map((item, ind) => {
                    return (
                      <>
                        <InputFieldComp
                          dataObj={{
                            // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
                            target: uniqueKey
                              ? `${useFormPropObj.formName}.${uniqueKey}.${
                                  arrName ?? "imgs_arr"
                                }[${index}].features[${ind}]`
                              : dataObj?.inputTarget
                              ? `${dataObj?.arrStr}.${index}.${dataObj?.inputTarget}`
                              : `accordions.${index}.title`,
                            placeholder:
                              dataObj?.placeholder ?? "Main Headline",
                            label: dataObj?.placeholder ?? "Main Headline",
                            isArr: true,
                            // value: item?.features[ind] ?? '',
                            onClick: handleDynamicTitleChange,
                          }}
                          uniqueKey={uniqueKey}
                          styles={{ margin: "0.7em 0 0 0", width: "95%" }}
                          useFormPropObj={useFormPropObj}
                        />
                        {/* <InputFieldComp
                      dataObj={{
                        // arrStr: uniqueKey ??dataObj?.arrStr ?? 'accordions',
                        //   target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].title` : dataObj?.inputTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.inputTarget}` : `accordions.${index}.title`,
                        // target: `${useFormPropObj.formName}.${uniqueKey}.plans_section[${index}].plans_section.features[${ind}]`,
                    target: uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].plans_section.features[${ind}]` : dataObj?.descriptionTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.descriptionTarget}` : `accordions.${index}.description`,


                        placeholder: dataObj?.placeholder ?? 'Main Headline',
                        label: dataObj?.placeholder ?? 'Main Headline',
                        isArr: true,
                        onClick: handleDynamicTitleChange
                      }}
                      // valFromFirebase={body.plans_section[index].features[ind]}
                      // uniqueKey={uniqueKey}
                      styles={{ margin: '0.7em 0 0 0', width: '95%' }}

                      useFormPropObj={useFormPropObj}
                    /> */}
                      </>
                    );
                  })}
              </Box>
              <Button
                onClick={() => {
                  let tempArr =
                    useFormPropObj.getValues(
                      `${useFormPropObj.formName}.${uniqueKey}.${
                        arrName ?? "imgs_arr"
                      }[${index}].features`
                    ) || [];
                  console.log(tempArr);
                  tempArr.push("");
                  useFormPropObj.setValue(
                    `${useFormPropObj.formName}.${uniqueKey}.${
                      arrName ?? "imgs_arr"
                    }[${index}].features`,
                    tempArr
                  );
                }}
              >
                ADD list item
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box mt={2} sx={{ alignSelf: "end" }}>
        <Button variant="outlined" onClick={() => appendObjToArr()}>
          Add Accordion
        </Button>

        {/* <Button variant="outlined" onClick={() => uniqueKey ? appendObjToArr() : useFormPropObj.append(dataObj?.appendObj ?? { title: '', description: '', imgUrl: '' })}>Add Accordion</Button> */}
        {/* <Button variant="outlined" onClick={() => useFormPropObj.append(dataObj?.appendObj ?? { title: '', description: '', imgUrl: '' })}>Add Accordion</Button> */}
      </Box>
    </Box>
  );
};

export default CustomDynamicAccordionWithList;
