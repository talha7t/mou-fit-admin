import React, { useState, useEffect, useRef, createRef } from "react";
import Grid from "@mui/material/Grid";
import { useForm, useFieldArray } from "react-hook-form";

import ChipContainer from "@/components/Widgets/SharedWidgets/Containers/ChipContainer";
import TitleAndBtnRow from "@/components/Sections/SharedSections/TitleAndBtnRow";
import HomeBannerSection from "@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeBannerSection";
import HomeChooseUsSection from "@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeChooseUsSection";
import { Button, Modal } from "@mui/material";
import DraggableModal from "@/components/Widgets/SharedWidgets/Models/DraggableModal";
import CustomDynamicAccordionWithList from "../Widgets/SharedWidgets/Accordion/CustomDynamicAccordionWithList";
import {
  addRenderCountParamInArr,
  // returnRelatedParentEntries,
  separateImgsArrDynamically,
} from "../Helpers/GlobalFuncs";
import SingleColWithImg from "../Widgets/SharedWidgets/ColSections/SingleColWithImg";
import TitleWithMultipleImgs from "../Sections/SharedSections/TitleWithMultipleImgs";
import CustomDynamicAccordion from "../Widgets/SharedWidgets/Accordion/CustomDynamicAccordion";
import { homePageAvailableSections } from "../Utils/StaticData/homePageData";
import HomeArticleSection from "../Sections/SingleUseSections/HomeCustomizationSections/HomeArticleSection";

const HomeCustomizationView = ({
  dynamicSectionsArr,
  useFormPropObj,
  methodsObj,
}) => {
  //  ,handleCloseModal, handleOpenModal
  const { onSubmit, setDynamicSectionsArr, handleSubmit } = methodsObj;

  let padding = "4em 0 0 ";

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // console.log(dynamicSectionsArr)
  };

  return (
    <Grid
      container
      sx={{
        padding: {
          sm: `${padding} 6em`,
          md: `${padding} 5em`,
          lg: `${padding} 1.2em`,
          xl: `${padding} 0em`,
        },
      }}
      spacing={1}
    >
      <form
        style={{ width: "97%", marginRight: "1em" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ChipContainer
          styles={{
            padding: "1em 1.3em",
            margin: "0 0em 1em 1em",
          }}
        >
          {/* Title && BUTTON ROW */}
          <Button onClick={() => {
            // -----------------------------------------------------------------------------------------------------dynamicSectionsArr
            // const tempResp = separateImgsArrDynamically(dynamicSectionsArr,useFormPropObj, useFormPropObj?.getValues(`${useFormPropObj?.formName}.dynamicSectionsArr`));

            // const resp = separateImgsArrDynamically(dynamicSectionsArr,useFormPropObj, useFormPropObj?.getValues(`${useFormPropObj?.formName}.updatedSections`));
            // console.log('dynamicSectionsArr ==> resp',resp);
            // console.log('tempResp ==> updatedSections',tempResp);

            console.log('watch', useFormPropObj.watch());


          }}>
            New CHECK
          </Button>

          <TitleAndBtnRow
            data={{
              onClick: onSubmit,
              dynamicSectionsArr: addRenderCountParamInArr(dynamicSectionsArr),
              setDynamicSectionsArr,
              availableSections: homePageAvailableSections,
            }}
            useFormPropObj={useFormPropObj}
            styles={{ margin: "0 0  1em 0" }}
          />

          {addRenderCountParamInArr(dynamicSectionsArr).map((section, ind) => {
            if (!section.is_active) return null;

            // /* <HomeBannerSection uniqueKey={`_0${ind + 1}-${section.renderCount}-${section.index}-`} key={section.index} useFormPropObj={useFormPropObj} body={section.body} />; */

            switch (section.label) {
              // if(section.label === 'main_banner'){
              // setUniqueStr =

              // }
              case "main_banner":
                return (
                  <HomeBannerSection
                    // targetImgDirect={true}
                    uniqueKey={`${ind}-main_banner`}
                    key={section.index}
                    useFormPropObj={useFormPropObj}
                    body={section.body}
                    targetArr={[
                      {
                        placeholder: "Banner Title",
                        target: `${ind}-main_banner.body.title`,
                        label: "",
                        value: section.body.title,
                      },
                      {
                        placeholder: "Banner desc",
                        target: `${ind}-main_banner.body.desc`,
                        label: "",
                        value: section.body.desc,
                      },
                      // { placeholder: 'Button Text', target: `${ind}-main_banner.body.btnText`, label: '', value: getValues(`${ind}-main_banner.body.btnText`) },
                      {
                        placeholder: "Button Text",
                        target: `${ind}-main_banner.body.btnText`,
                        label: "",
                        value: section.body.btnText,
                      },
                    ]}
                  />
                );

              case "three_col":
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
                        styles={{ height: "100%" }}
                        uniqueKey={`${ind}-three_col.body.col1`}
                        useFormPropObj={useFormPropObj}
                        body={section.body.col1}
                        defaultImg={section.body.col1.imgSrc}
                        targetArr={[
                          {
                            placeholder: "Banner Title",
                            target: `${ind}-three_col.body.col1.title`,
                            label: "",
                            value: section?.body?.col1?.title ?? "",
                          },
                          {
                            placeholder: "Banner desc",
                            target: `${ind}-three_col.body.col1.desc`,
                            label: "",
                            value: section?.body?.col1?.desc ?? "",
                          },
                          {
                            placeholder: "Button Text",
                            target: `${ind}-three_col.body.col1.btnText`,
                            label: "",
                            value: section?.body?.col1?.btnText ?? "",
                          },
                        ]}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3.9}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <SingleColWithImg
                        styles={{ height: "100%" }}
                        uniqueKey={`${ind}-three_col.body.col2`}
                        useFormPropObj={useFormPropObj}
                        body={section.body.col2}
                        defaultImg={section.body.col2.imgSrc}
                        targetArr={[
                          {
                            placeholder: "Banner Title",
                            target: `${ind}-three_col.body.col2.title`,
                            label: "",
                            value: section?.body?.col2?.title ?? "",
                          },
                          {
                            placeholder: "Banner desc",
                            target: `${ind}-three_col.body.col2.desc`,
                            label: "",
                            value: section?.body?.col2?.desc ?? "",
                          },
                          {
                            placeholder: "Button Text",
                            target: `${ind}-three_col.body.col2.btnText`,
                            label: "",
                            value: section?.body?.col2?.btnText ?? "",
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={3.9}>
                      <SingleColWithImg
                        styles={{ height: "100%" }}
                        uniqueKey={`${ind}-three_col.body.col3`}
                        useFormPropObj={useFormPropObj}
                        body={section.body.col3}
                        targetArr={[
                          {
                            placeholder: "Banner Title",
                            target: `${ind}-three_col.body.col3.title`,
                            label: "",
                            value: section?.body?.col3?.title ?? "",
                          },
                          {
                            placeholder: "Banner desc",
                            target: `${ind}-three_col.body.col3.desc`,
                            label: "",
                            value: section?.body?.col3?.desc ?? "",
                          },
                          {
                            placeholder: "Button Text",
                            target: `${ind}-three_col.body.col3.btnText`,
                            label: "",
                            value: section?.body?.col3?.btnText ?? "",
                          },
                        ]}
                      />
                    </Grid>
                  </Grid>
                );

              case "text_img_section":
                return (
                  <HomeBannerSection
                    uniqueKey={`${ind}-text_img_section`}
                    key={section.index}
                    useFormPropObj={useFormPropObj}
                    body={section.body}
                    targetArr={[
                      {
                        placeholder: " Title",
                        target: `${ind}-text_img_section.body.title`,
                        label: "",
                        value: section?.body?.title ?? "",
                      },
                      {
                        placeholder: "Sub Title",
                        target: `${ind}-text_img_section.body.sub_title`,
                        label: "",
                        value: section?.body?.sub_title ?? "",
                      },
                      {
                        placeholder: "Description",
                        target: `${ind}-text_img_section.body.desc`,
                        label: "",
                        value: section?.body?.desc ?? "",
                      },
                      {
                        placeholder: "Button Text",
                        target: `${ind}-text_img_section.body.btn_text`,
                        label: "",
                        value: section?.body?.btn_text ?? "",
                      },
                    ]}
                  />
                );

              case "slider_section":
                return (
                  <Grid item xs={12} key={section.index}>
                    <HomeChooseUsSection
                      grid={12}
                      uniqueKey={`${ind}-slider_section.body`}
                      arrName={"slider_arr"}
                      arrFromFirebase={
                        section.body.slider_arr
                      }
                      useFormPropObj={useFormPropObj}
                      body={section.body}
                    />
                    {/* <TitleWithMultipleImgs
                      // renderCount={section?.renderCount ?? 0}
                      uniqueKey={`${ind}-slider_section.body`}
                      useFormPropObj={useFormPropObj}
                      body={section.body}
                      targetArr={[
                        {
                          placeholder: "Title",
                          target: `${ind}-slider_section.body.title`,
                          label: "",
                          value: section?.body?.title ?? "",
                        },
                      ]}
                    /> */}
                  </Grid>
                );

              case "why_us_section":
                return (
                  <Grid item xs={12} key={section.index}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid item xs={5.8}>
                        {/* @@ USE DYNAMICACCORDION INSTEAD !! */}
                        {/* <ContactUsSecondBanner arrStr={`hCPForm.${ind}-why_us_section.left_section.dynamic_section.right_col`} uniqueKey={`${ind}-why_us_section`} key={section.index} useFormPropObj={useFormPropObj} body={section.body} accordionGrid={12} />; */}
                        <HomeChooseUsSection
                          grid={12}
                          uniqueKey={`${ind}-why_us_section.body.left_section.dynamic_section`}
                          arrName={"right_col"}
                          arrFromFirebase={
                            section.body.left_section.dynamic_section.right_col
                          }
                          useFormPropObj={useFormPropObj}
                          body={section.body}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <HomeChooseUsSection
                          grid={12}
                          uniqueKey={`${ind}-why_us_section.body.left_section.dynamic_section`}
                          arrName={"left_col"}
                          arrFromFirebase={
                            section.body.left_section.dynamic_section.left_col
                          }
                          useFormPropObj={useFormPropObj}
                          body={section.body}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <HomeBannerSection
                        targetImgDirect={true}
                        uniqueKey={`${ind}-why_us_section.body.right_section`}
                        useFormPropObj={useFormPropObj}
                        body={section.body}
                        targetArr={[
                          {
                            placeholder: "Left Section Title",
                            target: `${ind}-why_us_section.body.left_section.title`,
                            label: "",
                            value: section?.body?.left_section?.title ?? "",
                          },
                          {
                            placeholder: "Desc",
                            target: `${ind}-why_us_section.body.left_section.desc`,
                            label: "",
                            value: section?.body?.left_section?.desc ?? "",
                          },
                          {
                            placeholder: "Button Text",
                            target: `${ind}-why_us_section.body.left_section.btnText`,
                            label: "",
                            value: section?.body?.left_section?.btnText ?? "",
                          },
                          {
                            placeholder: "Right Section Title",
                            target: `${ind}-why_us_section.body.right_section.title`,
                            label: "",
                            value: section?.body?.right_section?.title ?? "",
                          },
                        ]}
                      />
                    </Grid>
                  </Grid>
                );

              case "pricing_section":
                return (
                  <CustomDynamicAccordionWithList
                    uniqueKey={`${ind}-pricing_section.body`}
                    arrToMap={section.body.plans_section}
                    arrName={"plans_section"}
                    key={section.index}
                    useFormPropObj={useFormPropObj}
                    body={section.body}
                  />
                );

              case "responsive_banner":
                return (
                  <HomeBannerSection
                    uniqueKey={`${ind}-responsive_banner`}
                    key={section.index}
                    useFormPropObj={useFormPropObj}
                    body={section.body}
                    targetArr={[
                      {
                        placeholder: "Desktop Title",
                        target: `${ind}-responsive_banner.body.desktop_banner_text`,
                        label: "",
                        value: section?.body?.desktop_banner_text ?? "",
                      },
                      {
                        placeholder: "Desktop Button Text",
                        target: `${ind}-responsive_banner.body.desktop_btn_text`,
                        label: "",
                        value: section?.body?.desktop_btn_text ?? "",
                      },
                      // { placeholder: 'Desktop Button Link', target: `${ind}-responsive_banner.body.desktop_btn_link`, label: '', value: section?.body?.desktop_btn_link ?? '' },
                      {
                        placeholder: "Mobile Title",
                        target: `${ind}-responsive_banner.body.mobile_banner_text`,
                        label: "",
                        value: section?.body?.mobile_banner_text ?? "",
                      },
                      {
                        placeholder: "Mobile Button Text",
                        target: `${ind}-responsive_banner.body.mobile_btn_text`,
                        label: "",
                        value: section?.body?.mobile_btn_text ?? "",
                      },
                      {
                        placeholder: "Button Link",
                        target: `${ind}-responsive_banner.body.btn_link`,
                        label: "",
                        value: section?.body?.btn_link ?? "",
                      },
                      // { placeholder: 'Mobile Button Link', target: `${ind + 1}-responsive_banner.body.mobile_btn_link`, label: '', value: section?.body?.mobile_btn_link ?? '' },
                    ]}
                  />
                );

              case "articles_section":
                return (
                  <HomeArticleSection
                    key={section.index}
                    uniqueKey={`${ind}-articles_section.body`}
                    arrName={"dynamic_section"}
                    arrFromFirebase={section.body.dynamic_section}
                    useFormPropObj={useFormPropObj}
                    body={section.body}
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

export default HomeCustomizationView;
