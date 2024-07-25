import CustomAccordionWithTwoInputs from "@/components/Widgets/SharedWidgets/Accordion/CustomAccordionWithTwoInputs";
import InputFieldComp from "@/components/Widgets/SharedWidgets/InputFields/InputFieldComp";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import ImageContainerWithBtns from "../../SharedSections/ImageContainerWithBtns";
import ButtonComp from "@/components/Widgets/SharedWidgets/Buttons/ButtonComp";

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
  imgContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
};

const HeaderCustomizationSection = ({ dataObj, useFormPropObj, target }) => {
  const { getValues, formName, setValue } = useFormPropObj;
 

 
return (
    <Grid container xs={12} className='head__wrapper'>
        <Grid item xs={6} >

        <CustomAccordionWithTwoInputs  useFormPropObj={useFormPropObj} target={'headSection.nav_data'}/>
        <ButtonComp
                    data={{
                        title: 'Add An Item',
                        onClick: () => {
                           let tempArr =  getValues(`${formName}.headSection.nav_data`)
                           let newObj = {link: '/', label: ''}
                           tempArr.push(newObj)
                           setValue(`${formName}.headSection.nav_data`, tempArr)
                        }
                    }}

                    styles={{
                        margin: '1em ',
                        padding: styles?.padding ?? '0.5em 2em',
                        hvrPadding: styles?.hvrPadding ?? '0.6em 2em',
                    }}
                />
        </Grid>
<Grid item xs={6} >
<Box my={1} sx={styles.imgContainer} >

<ImageContainerWithBtns
//   imageSrc={uniqueKey ? useFormPropObj.getValues(`${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].imgUrl`) : useFormPropObj?.getValues(`${dataObj?.imgTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.imgTarget}` : `accordions.${index}.imgUrl`}`)}
imageSrc={ getValues(`${formName}.headSection.nav_logo`) ?? 'https://via.placeholder.com/300x200?text=No+Image'}


//   target={uniqueKey ? `${useFormPropObj.formName}.${uniqueKey}.${arrName ?? 'imgs_arr'}[${index}].imgUrl` : dataObj?.imgTarget ? `${dataObj?.arrStr}.${index}.${dataObj?.imgTarget}` : `accordions.${index}.imgUrl`}
target={ `${formName}.headSection.nav_logo`}
  placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"
  // onImageChange={handleImageChange}
  // onImageRemove={handleImageRemove}
//   index={index}
  useFormPropObj={useFormPropObj}

// imgStyles={{ btnColor: 'black' }}
/>
</Box>
</Grid>
    </Grid>
)


  //   return (dataObj.headSection.nav_data ?? getValues(`${formName}.headSection.nav_data`) ?? []).map((x, i) => {
//   return (getValues(`${formName}.${target ?? 'headSection.nav_data'}`) ?? []).map((x, i) => {
//     return (
//       <Accordion key={i} sx={styles.accordion}>
//         <AccordionSummary
//           expandIcon={<AiOutlineDown color="rgb(196, 196, 196)" />}
//           sx={styles.accordionSummary}
//         >
//           <Typography sx={{ margin: 0 }}>Icon {i + 1}</Typography>
//           {/* {index === useFormPropObj.fields.length - 1 && */}
//           <IconButton onClick={() => handleDelete(i)} sx={styles.deleteIcon}>
//             <FaTrash />
//           </IconButton>
//           {/* } */}
//         </AccordionSummary>
//         <AccordionDetails sx={styles.accordionDetails}>
//           <Box display="flex" flexDirection="column" width="100%">
//             <InputFieldComp
//               dataObj={{
//                 placeholder: x.label ?? "",
//                 target: `${x.label ?? "bannerTitle"}`,
//                 target: `headSection.nav_data[${i}].label`,

//                 label: x.label ?? "",
//               }}
//               styles={{ margin: "0.7em 0 0 0", width: "97%" }}
//               useFormPropObj={useFormPropObj}
//             />

//             <Box my={1}>
//               <InputFieldComp
//                 dataObj={{
//                   placeholder: x.label ?? "",
//                   target: `${x.label ?? "bannerTitle"}`,
//                   target: `headSection.nav_data[${i}].label`,

//                   label: x.label ?? "",
//                 }}
//                 styles={{ margin: "0.7em 0 0 0", width: "97%" }}
//                 useFormPropObj={useFormPropObj}
//               />
//             </Box>
//           </Box>
//         </AccordionDetails>
//       </Accordion>
//     );
//   });
};

export default HeaderCustomizationSection;
