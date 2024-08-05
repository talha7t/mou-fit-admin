import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Grid } from "@mui/material";
import ChipContainer from "@/components/Widgets/SharedWidgets/Containers/ChipContainer";
import FlexContainer from "@/components/Widgets/SharedWidgets/Containers/FlexContainer";
import TitleAndBtnRow from "@/components/Sections/SharedSections/TitleAndBtnRow";
import ContactUsFirstBanner from "@/components/Sections/SingleUseSections/ContactUsCustomizationSections/ContactUsFirstBanner";
import ContactUsFourthBanner from "@/components/Sections/SingleUseSections/ContactUsCustomizationSections/ContactUsFourthBanner";
import ContactUsThirdBanner from "@/components/Sections/SingleUseSections/ContactUsCustomizationSections/ContactUsThirdBanner";
import ContactUsSecondBanner from "@/components/Sections/SingleUseSections/ContactUsCustomizationSections/ContactUsSecondBanner";
import {
  contactUsSampleData,
  contactUsPageAvailableSections,
} from "@/components/Utils/StaticData/ContactUsPageData";
import HomeBannerSection from "@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeBannerSection";
import HomeChooseUsSection from "@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeChooseUsSection";
import {
  addRenderCountParamInArr,
  extractPropertiesFromObj,
  getFilteredKeysArr,
  getFilteredValsArr,
  moveImgsArrIntoNewDoc,
} from "@/components/Helpers/GlobalFuncs";
import SingleColWithImg from "@/components/Widgets/SharedWidgets/ColSections/SingleColWithImg";
import {
  getAllDocsWithinCollection,
  getDynmaicSectionsFromOldFirebase,
  updateDynmaicSectionsInOldFirebase,
  updateOrCreateDocumentsByKeys,
} from "@/components/Helpers/ApiCalls/firebaseApiCalls";
import { oldDB } from "@/components/firebase-config";

const containerStyles = {
  padding: {
    xs: `4em 1rem 1rem 1rem`,
    sm: "4em 2rem 0 260px",
    md: "4em 2rem 0 260px",
    lg: "4em 2rem 0 260px",
    xl: "4em 2rem 0 260px",
  },
}

const ContactUs = () => {
  const [dynamicSectionsArr, setDynamicSectionsArr] = useState([]);

  const {
    register,
    control,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contactUsForm: {
        dynamicSectionsArr: [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "accordions",
  });

  const useFormPropObj = {
    formName: "contactUsForm",
    register,
    getValues,
    setValue,
    watch,
    control,
    fields,
    append,
    remove,
  };

  let padding = "4em 2em 0 ";
  const onSubmit = async (e) => {
    console.log(e?.preventDefault());
    // console.log(watch());
    // console.log(dynamicSectionsArr);
    try {
      console.log("watch", watch());

      // console.log('extractProperties(dynamicSectionsArr)', extractPropertiesFromObj(getValues('contactUsForm.dynamicSectionsArr')))
      let extractedFinalArr = extractPropertiesFromObj(
        getValues("contactUsForm.dynamicSectionsArr"),
        "contactUsForm",
        getValues
      );

      await moveImgsArrIntoNewDoc(extractedFinalArr, useFormPropObj);

      //  console.log('moveImagesProcess',moveImagesProcess)

      console.log("extractedFinalArr", extractedFinalArr);

      let finalFilteredKeysArr = [];
      let finalFilteredValsArr = [];

      finalFilteredKeysArr =
        (await getFilteredKeysArr(watch().contactUsForm, useFormPropObj)) || [];
      finalFilteredValsArr =
        (await getFilteredValsArr(finalFilteredKeysArr, useFormPropObj)) || [];

      console.log("finalsortedFilteredKeysArr", finalFilteredKeysArr);
      console.log("finalFilteredValsArr", finalFilteredValsArr);
      // setValue('contactUsForm.dynamicSectionsArr', finalFilteredValsArr);
      // setDynamicSectionsArr(finalFilteredValsArr);

      let tempResp = await updateOrCreateDocumentsByKeys(
        oldDB,
        "contact_us_dynamic_page",
        finalFilteredKeysArr,
        finalFilteredValsArr
      );

      console.log(tempResp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(watch());
    try {
      const fetchSections = async (respArr) => {
        return await getAllDocsWithinCollection("contact_us_dynamic_page");
      };
      let resp = fetchSections().then((data) => {
        console.log(data);
        setDynamicSectionsArr(data);
        setValue("contactUsForm.dynamicSectionsArr", data);

        data?.map((y, yInd) => {
          setValue(
            `contactUsForm.${y.index}-${y.label}`,
            getValues(`contactUsForm.dynamicSectionsArr[${yInd}]`)
          );
        });
      });
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  }, [watch]);

  useEffect(() => {}, [dynamicSectionsArr]);

  return (
    <Grid
      container
      sx={containerStyles}
      spacing={1}
    >
      <form style={{ width: "97%" }} onSubmit={handleSubmit(onSubmit)}>
        <ChipContainer
          styles={{
            padding: "1em 1.3em",
            margin: "0 0 1em 1em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TitleAndBtnRow
            data={{
              onClick: onSubmit,
              text: "Contact Us Page Customization",
              dynamicSectionsArr,
              setDynamicSectionsArr,
              availableSections: contactUsPageAvailableSections,
            }}
            useFormPropObj={useFormPropObj}
            styles={{ margin: "0 0  1em 0" }}
          />

          {/* {addRenderCountParamInArr(dynamicSectionsArr)?.map((section, ind) => { */}
          {addRenderCountParamInArr(getValues('contactUsForm.dynamicSectionsArr'))?.map((section, ind) => {

            if (!section.is_active) return null;

            {
              /* <HomeBannerSection uniqueKey={`_0${ind + 1}-${section.renderCount}-${section.index}-`} key={section.index} useFormPropObj={useFormPropObj} body={section.body} />; */
            }
            {
              /* CREATE A SECTION WITH  4-5 Inputs + IMg || Video */
            }

            switch (section.label) {
              case "main_banner":
                return (
                  <HomeBannerSection
                  // uniqueKey={`dynamicSectionsArr[${ind}].body`}
                    uniqueKey={`${ind}-main_banner`}

                    key={section.index}
                    useFormPropObj={useFormPropObj}
                    body={section.body}
                    targetArr={[
                      {
                        placeholder: "Banner Title",
                        target: `${ind}-main_banner.body.title`,
                        // target: `dynamicSectionsArr[${ind}].body.title`,
                        label: "",
                        value: section.body.title,
                      },
                      // {
                      //   placeholder: "Banner desc",
                      //   target: `${ind}-main_banner.body.desc`,
                      //   label: "",
                      //   value: section.body.desc,
                      // },
                      // // { placeholder: 'Button Text', target: `${ind}-main_banner.body.btnText`, label: '', value: getValues(`${ind}-main_banner.body.btnText`) },
                      // {
                      //   placeholder: "Button Text",
                      //   target: `${ind}-main_banner.body.btnText`,
                      //   label: "",
                      //   value: section.body.btnText,
                      // },
                    ]}
                  />
                );

              case "three_icons":
                return (
                  <Grid
                    key={section.index}
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "1em",
                    }}
                  >
                    <Grid item xs={3.9}>
                      <SingleColWithImg
                        uniqueKey={`${ind}-three_icons.body.col1`}
                        useFormPropObj={useFormPropObj}
                        body={section.body.col1}
                        targetArr={[
                          {
                            placeholder: "Banner Title",
                            target: `${ind}-three_icons.body.col1.heading`,
                            label: "",
                            value: section?.body?.col1?.title ?? "",
                          },
                          {
                            placeholder: "Banner desc",
                            target: `${ind}-three_icons.body.col1.info`,
                            label: "",
                            value: section?.body?.col1?.desc ?? "",
                          },
                          // {
                          //   placeholder: "Button Text",
                          //   target: `${ind}-three_icons.body.col1.btnText`,
                          //   label: "",
                          //   value: section?.body?.col1?.btnText ?? "",
                          // },
                        ]}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3.9}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <SingleColWithImg
                        uniqueKey={`${ind}-three_icons.body.col2`}
                        useFormPropObj={useFormPropObj}
                        body={section.body.col2}
                        targetArr={[
                          {
                            placeholder: "Banner Title",
                            target: `${ind}-three_icons.body.col2.heading`,
                            label: "",
                            value: section?.body?.col2?.title ?? "",
                          },
                          {
                            placeholder: "Banner desc",
                            target: `${ind}-three_icons.body.col2.info`,
                            label: "",
                            value: section?.body?.col2?.desc ?? "",
                          },
                          // {
                          //   placeholder: "Button Text",
                          //   target: `${ind}-three_icons.body.col2.btnText`,
                          //   label: "",
                          //   value: section?.body?.col2?.btnText ?? "",
                          // },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={3.9}>
                      <SingleColWithImg
                        uniqueKey={`${ind}-three_icons.body.col3`}
                        useFormPropObj={useFormPropObj}
                        body={section.body.col3}
                        targetArr={[
                          {
                            placeholder: "Banner Title",
                            target: `${ind}-three_icons.body.col3.title`,
                            label: "",
                            value: section?.body?.col3?.title ?? "",
                          },
                          {
                            placeholder: "Banner desc",
                            target: `${ind}-three_icons.body.col3.desc`,
                            label: "",
                            value: section?.body?.col3?.desc ?? "",
                          },
                          // {
                          //   placeholder: "Button Text",
                          //   target: `${ind}-three_icons.body.col3.btnText`,
                          //   label: "",
                          //   value: section?.body?.col3?.btnText ?? "",
                          // },
                        ]}
                      />
                    </Grid>
                  </Grid>
                );

              case "contact_form":
                return (
                  <HomeBannerSection
                  disableImage={true}
                    uniqueKey={`${ind}-contact_form`}
                    key={section.index}
                    useFormPropObj={useFormPropObj}
                    body={section.body}
                    targetArr={[
                      {
                        placeholder: "Banner Title",
                        target: `${ind}-contact_form.body.title`,
                        label: "",
                        value: section.body.title,
                      },
                      {
                        placeholder: "Banner desc",
                        target: `${ind}-contact_form.body.desc`,
                        label: "",
                        value: section.body.desc,
                      },
                      // { placeholder: 'Button Text', target: `${ind}-contact_form.body.btnText`, label: '', value: getValues(`${ind}-contact_form.body.btnText`) },
                      {
                        placeholder: "Button Text",
                        target: `${ind}-contact_form.body.btnText`,
                        label: "",
                        value: section.body.btnText,
                      },
                    ]}
                  />
                );

              default:
                return null;
            }
          })}
        </ChipContainer>
      </form>
    </Grid>
  );
};

export default ContactUs;
