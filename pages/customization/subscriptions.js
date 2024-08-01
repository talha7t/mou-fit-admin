import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ChipContainer from "@/components/Widgets/SharedWidgets/Containers/ChipContainer";
import TitleAndBtnRow from "@/components/Sections/SharedSections/TitleAndBtnRow";
import { useFieldArray, useForm } from "react-hook-form";
import SubscriprionFirstSection from "@/components/Sections/SingleUseSections/SubscriptionCustomizationSections/SubscriprionFirstSection";
import SubscriptionSecondBanner from "@/components/Sections/SingleUseSections/SubscriptionCustomizationSections/SubscriptionSecondBanner";
import SubscriptionFifthBanner from "@/components/Sections/SingleUseSections/SubscriptionCustomizationSections/SubscriptionFifthBanner";
import SubscriptionThirdBanner from "@/components/Sections/SingleUseSections/SubscriptionCustomizationSections/SubscriptionThirdBanner";
import SubscriptionFourthSection from "@/components/Sections/SingleUseSections/SubscriptionCustomizationSections/SubscriptionFourthSection";
import {
  subscriptionPageAvailableSections,
  subscriptionPageSampleData,
} from "@/components/Utils/StaticData/subscriptionPageData";
import HomeBannerSection from "@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeBannerSection";
import CustomDynamicAccordionWithList from "@/components/Widgets/SharedWidgets/Accordion/CustomDynamicAccordionWithList";
import HomeChooseUsSection from "@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeChooseUsSection";
import {
  addRenderCountParamInArr,
  extractPropertiesFromObj,
  getFilteredKeysArr,
  getFilteredValsArr,
  moveImgsArrIntoNewDoc,
} from "@/components/Helpers/GlobalFuncs";
import {
  getAllDocsWithinCollection,
  getDynmaicSectionsFromOldFirebase,
  updateDynmaicSectionsInOldFirebase,
  updateOrCreateDocumentsByKeys,
} from "@/components/Helpers/ApiCalls/firebaseApiCalls";
import { oldDB } from "@/components/firebase-config";

const Subscriptions = () => {
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
      subscriptionsForm: {
        firstBanner: {
          title: "",
          imgSrc: "",
        },
        secondBanner: {
          heading: "",
          subHeading: "",
        },
        thirdBanner: {
          plansCount: "",
          selectedPlans: [],
        },

        fourthBanner: {
          title: "",
          description: "",
        },
        fifthBanner: {
          bannerText: "",
          btnText: "",
          imgSrc: "",
        },
        // dynamicSectionsArr: subscriptionPageSampleData || [],
        dynamicSectionsArr: [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  const useFormPropObj = {
    formName: "subscriptionsForm",
    register,
    getValues,
    setValue,
    watch,
    control,
    fields,
    append,
    remove,
  };

  const onSubmit = async (e) => {
    // console.log(watch());
    // console.log(dynamicSectionsArr);
    try {
      console.log("watch", watch());

      // console.log('extractProperties(dynamicSectionsArr)', extractPropertiesFromObj(getValues('subscriptionsForm.dynamicSectionsArr')))
      let extractedFinalArr = extractPropertiesFromObj(
        getValues("subscriptionsForm.dynamicSectionsArr"),
        "subscriptionsForm",
        getValues
      );

      await moveImgsArrIntoNewDoc(extractedFinalArr, useFormPropObj);

      //  console.log('moveImagesProcess',moveImagesProcess)

      console.log("extractedFinalArr", extractedFinalArr);

      let finalFilteredKeysArr = [];
      let finalFilteredValsArr = [];

      finalFilteredKeysArr = await getFilteredKeysArr(
        watch().subscriptionsForm,
        useFormPropObj
      );
      finalFilteredValsArr = await getFilteredValsArr(
        finalFilteredKeysArr,
        useFormPropObj
      );

      console.log("finalsortedFilteredKeysArr", finalFilteredKeysArr);
      console.log("finalFilteredValsArr", finalFilteredValsArr);
      // setValue('subscriptionsForm.dynamicSectionsArr', finalFilteredValsArr);
      // setDynamicSectionsArr(finalFilteredValsArr);

      let tempResp = await updateOrCreateDocumentsByKeys(
        oldDB,
        "subscriptions_dynamic_page",
        finalFilteredKeysArr,
        finalFilteredValsArr
      );

      console.log(tempResp);
    } catch (err) {
      console.log(err);
    }
  };

  let padding = "4em 2em 0 ";

  useEffect(() => {}, [dynamicSectionsArr]);

  useEffect(() => {
    console.log(watch());
    try {
      const fetchSections = async (respArr) => {
        return await getAllDocsWithinCollection("subscriptions_dynamic_page");
      };
      let resp = fetchSections().then((data) => {
        console.log(data);
        setDynamicSectionsArr(data);
        setValue("subscriptionsForm.dynamicSectionsArr", data);

        data?.map((y, yInd) => {
          setValue(
            `subscriptionsForm.${y.index}-${y.label}`,
            getValues(`subscriptionsForm.dynamicSectionsArr[${yInd}]`)
          );
        });
      });
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  }, [watch]);

  //   useEffect(() => {
  //     console.log(watch());
  //     const fetchSections = async () => {
  //         // console.log(await getDynmaicSection('test_collection', 'home_test_page'))
  //         return await getDynmaicSectionsFromOldFirebase('test_collection', 'subscriptions_test_page')
  //     }
  //     // console.log(fetchSections().then(data => console.log(data.dynamic_sections)))
  //     fetchSections()
  //         .then(data => {
  //             let resp = data.dynamic_sections
  //             console.log(resp);
  //             // setDynamicSectionsArr(data.dynamic_sections);
  //             // setValue('subscriptionsForm.dynamicSectionsArr', data.dynamic_sections);

  //             let filteredKeysArr = []
  //             let keysArr = Object.keys(useFormPropObj?.watch()?.subscriptionsForm)
  //             keysArr.map((key, keyInd) => isNaN(key[0]) ? null : filteredKeysArr.push(Object.values(useFormPropObj?.watch()?.subscriptionsForm)[keyInd]))

  //             let tempArr = data.dynamic_sections;
  //             // let arrToChange = getValues('subscriptionsForm.dynamicSectionsArr');
  //             let finalArr = tempArr.map((x, i) => {
  //                 // arrToChange.body = x[i].body
  //                 // console.log(x)
  //                 // console.log(`${x.index}-${x.label}`)

  //                 // @@ SETTING EACH OBJ
  //                 setValue(`subscriptionsForm.${x.index}-${x.label}`, x)

  //                 return x
  //             });
  //             console.log(watch());

  //             // console.log('finalArr', finalArr)

  //             //  @@ COMMENT THIS LINE TO NOT USE FIREBASE DATA !!!
  //             setDynamicSectionsArr(finalArr)
  //             setValue('subscriptionsForm.dynamicSectionsArr', finalArr)

  //         })
  //         .catch(err => console.error(err))
  //     // setValue('subscriptionsForm.dynamicSectionsArr', fetchSections())
  // }, [watch])

  return (
    <>
      <Grid
        container
        sx={{
          padding: {
            xs: `${padding} 1em`,
            sm: `${padding} 2em`,
            md: `${padding} 2em`,
            lg: `${padding} 2em`,
            xl: `${padding} 0em`,
          },
        }}
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
            {/* TITLE AND BTN ROW */}
            <TitleAndBtnRow
              data={{
                text: "Subscriptions Page Customization",
                onClick: onSubmit,
                dynamicSectionsArr,
                setDynamicSectionsArr,
                availableSections: subscriptionPageAvailableSections,
              }}
              useFormPropObj={useFormPropObj}
              styles={{ margin: "0 0  1em 0" }}
            />

            {addRenderCountParamInArr(dynamicSectionsArr)?.map(
              (section, ind) => {
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
                        ]}
                      />
                    );

                  case "faqs_section":
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
                          {/* <Grid item xs={12}> */}
                            {/* @@ USE DYNAMICACCORDION INSTEAD !! */}
                            {/* <ContactUsSecondBanner arrStr={`hCPForm.${ind}-faqs_section.left_section.dynamic_section.right_col`} uniqueKey={`${ind}-faqs_section`} key={section.index} useFormPropObj={useFormPropObj} body={section.body} accordionGrid={12} />; */}
                            <HomeChooseUsSection
                              grid={12}
                              // styles={{ height: '100%' }}
                              uniqueKey={`${ind}-faqs_section.body`}
                              arrName={"accordions_section"}
                              arrFromFirebase={section.body.accordions_section}
                              useFormPropObj={useFormPropObj}
                              body={section.body}
                              targetArr={[
                                {
                                  placeholder: " Heading",
                                  target: `${ind}-faqs_section.body.heading`,
                                  label: "",
                                  value: section?.body?.heading ?? "",
                                },
                                {
                                  placeholder: "Sub Heading",
                                  target: `${ind}-faqs_section.body.sub_heading`,
                                  label: "",
                                  value: section?.body?.sub_heading ?? "",
                                },
                              ]}
                            />
                          </Grid>
                          {/* <Grid item xs={6}>
            <HomeChooseUsSection grid={12} uniqueKey={`${ind}-faqs_section.body.left_section.dynamic_section`} arrName={'left_col'} arrFromFirebase={section.body.left_section.dynamic_section.left_col} useFormPropObj={useFormPropObj} body={section.body} />;
          </Grid> */}
                        {/* </Grid> */}
                        {/* <Grid item xs={12}>
                          <HomeBannerSection
                            targetImgDirect={true}
                            uniqueKey={`${ind}-faqs_section.body`}
                            useFormPropObj={useFormPropObj}
                            body={section.body}
                            targetArr={[
                              {
                                placeholder: " Heading",
                                target: `${ind}-faqs_section.body.heading`,
                                label: "",
                                value: section?.body?.heading ?? "",
                              },
                              {
                                placeholder: "Sub Heading",
                                target: `${ind}-faqs_section.body.sub_heading`,
                                label: "",
                                value: section?.body?.sub_heading ?? "",
                              },
                              // {
                              //   placeholder: "Button Text",
                              //   target: `${ind}-faqs_section.body.btnText`,
                              //   label: "",
                              //   value:
                              //     section?.body?.btnText ?? "",
                              // },
                              // {
                              //   placeholder: "Right Section Title",
                              //   target: `${ind}-faqs_section.body.title`,
                              //   label: "",
                              //   value:
                              //     section?.body?.title ?? "",
                              // },
                            ]}
                          />
                        </Grid> */}
                      </Grid>
                    );

                  case "plans_section":
                    return (
                      <CustomDynamicAccordionWithList
                        targetArr={[
                          {
                            placeholder: "Type Of Gym Access",
                            target: `${ind}-plans_section.body.access`,
                            label: "",
                            value: section?.body?.access ?? "",
                          },
                          {
                            placeholder: "Plan Duration",
                            target: `${ind}-plans_section.body.duration`,
                            label: "",
                            value: section?.body?.duration ?? "",
                          },
                          {
                            placeholder: "Plan Name",
                            target: `${ind}-plans_section.body.plan`,
                            label: "",
                            value: section?.body?.title ?? "",
                          },
                          {
                            placeholder: "Plan Price",
                            target: `${ind}-plans_section.body.price`,
                            label: "",
                            value: section?.body?.title ?? "",
                          }
                        ]}
                        uniqueKey={`${ind}-plans_section.body`}
                        arrToMap={section.body.features}
                        arrName={"features"}
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
                            placeholder: "Button Text",
                            target: `${ind}-responsive_banner.body.desktop_btn_text`,
                            label: "",
                            value: section?.body?.desktop_btn_text ?? "",
                          },
                          // { placeholder: 'Desktop Button Link', target: `${ind}-responsive_banner.body.desktop_btn_link`, label: '', value: section?.body?.desktop_btn_link ?? '' },
                          // {
                          //   placeholder: "Mobile Title",
                          //   target: `${ind}-responsive_banner.body.mobile_banner_text`,
                          //   label: "",
                          //   value: section?.body?.mobile_banner_text ?? "",
                          // },
                          // {
                          //   placeholder: "Mobile Button Text",
                          //   target: `${ind}-responsive_banner.body.mobile_btn_text`,
                          //   label: "",
                          //   value: section?.body?.mobile_btn_text ?? "",
                          // },
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

                  default:
                    return null;
                }
              }
            )}
          </ChipContainer>
        </form>
      </Grid>
    </>
  );
};

export default Subscriptions;
