import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Grid } from '@mui/material';

import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import AboutUsFirstBanner from '@/components/Sections/SingleUseSections/AboutUsSections/AboutUsFirstBanner';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import AboutUsSecondBanner from '@/components/Sections/SingleUseSections/AboutUsSections/AboutUsSecondBanner';
import AboutUsThirdBanner from '@/components/Sections/SingleUseSections/AboutUsSections/AboutUsThirdBanner';
import AboutUsFourthBanner from '@/components/Sections/SingleUseSections/AboutUsSections/AboutUsFourthBanner';
import AboutUsFifthBanner from '@/components/Sections/SingleUseSections/AboutUsSections/AboutUsFifthBanner';
import AboutUsSixthBanner from '@/components/Sections/SingleUseSections/AboutUsSections/AboutUsSixthBanner';
import { addRenderCountParamInArr, extractPropertiesFromObj, getFilteredKeysArr, getFilteredValsArr, moveImgsArrIntoNewDoc } from '@/components/Helpers/GlobalFuncs';
import { getAllDocsWithinCollection, getDynmaicSectionsFromOldFirebase, updateDynmaicSectionsInOldFirebase, updateOrCreateDocumentsByKeys } from '@/components/Helpers/ApiCalls/firebaseApiCalls';
import { aboutUsPageAvailableSections, aboutUsSampleData } from '@/components/Utils/StaticData/aboutUsPageData';
import HomeBannerSection from '@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeBannerSection';
import TitleWithMultipleImgs from '@/components/Sections/SharedSections/TitleWithMultipleImgs';
import HomeChooseUsSection from '@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeChooseUsSection';
import { oldDB } from '@/components/firebase-config';

const containerStyles = {
  padding: {
    xs: `4em 1rem 1rem 1rem`,
    sm: "4em 2rem 0 260px",
    md: "4em 2rem 0 260px",
    lg: "4em 2rem 0 260px",
    xl: "4em 2rem 0 260px",
  },
}

const AboutUs = () => {

  const [dynamicSectionsArr, setDynamicSectionsArr] = useState(aboutUsSampleData || []);

  const { register, control, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      aboutUsForm: {
        dynamicSectionsArr: aboutUsSampleData || [],

        firstBanner: {
          bannerTitle: '',
          bannerImg: '',
        },
        secondBanner: {
          heading: '',
          subHeading: '',
          description: '',
          imgUrl: '',
        },

        fifthBanner: {
          gymCount: '',
          selectedGyms: []
        },
        sixthBanner: {
          bannerTitle: '',
          buttonText: '',
          ctaTitle: '',
          urlHandle: '',
          imgUrl: '',
        }
      }
    }
  });

  const {
    fields: dynamicFeaturesFields,
    append: dynamicFeaturesAppend,
    remove: dynamicFeaturesRemove
  } = useFieldArray({ control, name: "features" });
  const {
    fields: dynamicTeamFields,
    append: dynamicTeamAppend,
    remove: dynamicTeamRemove
  } = useFieldArray({ control, name: "teams" });


  const useFormTeamsPropObj = {
    formName: 'aboutUsForm',
    register,
    getValues,
    setValue,
    watch,
    control,
    fields: dynamicTeamFields,
    append: dynamicTeamAppend,
    remove: dynamicTeamRemove,
  };

  const useFormFeaturesPropObj = {
    formName: 'aboutUsForm',
    register,
    getValues,
    setValue,
    watch,
    control,
    fields: dynamicFeaturesFields,
    append: dynamicFeaturesAppend,
    remove: dynamicFeaturesRemove,
  };

  let padding = '4em 2em 0 ';

  const onSubmit = async (e) => {
    // console.log(watch());
    // console.log(dynamicSectionsArr);
    try {
      console.log("watch", watch());

      let extractedFinalArr = extractPropertiesFromObj(
        getValues("aboutUsForm.dynamicSectionsArr"),
        "aboutUsForm",
        getValues
      );

      await moveImgsArrIntoNewDoc(extractedFinalArr, useFormFeaturesPropObj);

      //  console.log('moveImagesProcess',moveImagesProcess)

      console.log("extractedFinalArr", extractedFinalArr);

      let finalFilteredKeysArr = [];
      let finalFilteredValsArr = [];

      finalFilteredKeysArr = await getFilteredKeysArr(
        watch().aboutUsForm,
        useFormFeaturesPropObj
      );
      finalFilteredValsArr = await getFilteredValsArr(
        finalFilteredKeysArr,
        useFormFeaturesPropObj
      );

      console.log("finalsortedFilteredKeysArr", finalFilteredKeysArr);
      console.log("finalFilteredValsArr", finalFilteredValsArr);
      // setValue('aboutUsForm.dynamicSectionsArr', finalFilteredValsArr);
      // setDynamicSectionsArr(finalFilteredValsArr);

      let tempResp = await updateOrCreateDocumentsByKeys(
        oldDB,
        "about_us_dynamic_page",
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
        return await getAllDocsWithinCollection("about_us_dynamic_page");
      };
      let resp = fetchSections().then((data) => {
        console.log(data);
        setDynamicSectionsArr(data);
        setValue("aboutUsForm.dynamicSectionsArr", data);

        data?.map((y, yInd) => {
          setValue(
            `aboutUsForm.${y.index}-${y.label}`,
            getValues(`aboutUsForm.dynamicSectionsArr[${yInd}]`)
          );
        });
      });
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  }, [watch]);
  // useEffect(() => {
  //   console.log(watch());
  //   const fetchSections = async () => {
  //     // console.log(await getDynmaicSection('test_collection', 'about_us_test_page'))
  //     return await getDynmaicSectionsFromOldFirebase('test_collection', 'about_us_test_page')
  //   }
  //   // console.log(fetchSections().then(data => console.log(data.dynamic_sections)))
  //   fetchSections()
  //     .then(data => {
  //       let resp = data.dynamic_sections
  //       console.log(resp);
  //       // setDynamicSectionsArr(data.dynamic_sections);
  //       // setValue('aboutUsForm.dynamicSectionsArr', data.dynamic_sections);

  //       let filteredKeysArr = []
  //       let keysArr = Object.keys(useFormFeaturesPropObj?.watch()?.aboutUsForm)
  //       keysArr.map((key, keyInd) => isNaN(key[0]) ? null : filteredKeysArr.push(Object.values(useFormFeaturesPropObj?.watch()?.aboutUsForm)[keyInd]))

  //       let tempArr = data.dynamic_sections;
  //       // let arrToChange = getValues('aboutUsForm.dynamicSectionsArr');
  //       let finalArr = tempArr.map((x, i) => {
  //         // arrToChange.body = x[i].body
  //         // console.log(x)
  //         // console.log(`${x.index}-${x.label}`)

  //         // @@ SETTING EACH OBJ 
  //         setValue(`aboutUsForm.${x.index}-${x.label}`, x)

  //         return x
  //       });
  //       console.log(watch());

  //       // console.log('finalArr', finalArr)

  //       //  @@ COMMENT THIS LINE TO NOT USE FIREBASE DATA !!!
  //       setDynamicSectionsArr(finalArr)
  //       setValue('aboutUsForm.dynamicSectionsArr', finalArr)

  //     })
  //     .catch(err => console.error(err))
  //   // setValue('aboutUsForm.dynamicSectionsArr', fetchSections())
  // }, [watch])

  return (
    <Grid container
      sx={containerStyles}
      spacing={1}
    >
      <form style={{ width: '97%' }} onSubmit={handleSubmit(onSubmit)}>

        <ChipContainer styles={{
          padding: '1em 1.3em',
          margin: '0 0 0 1rem',
        }} >
          {/* TITLE AND BTN ROW */}
          <TitleAndBtnRow data={{ onClick: onSubmit, text: 'About Us Page Customization', dynamicSectionsArr, setDynamicSectionsArr, availableSections: aboutUsPageAvailableSections }} useFormPropObj={useFormFeaturesPropObj} styles={{ margin: '0 0  1em 0' }} />

          {addRenderCountParamInArr(dynamicSectionsArr)?.map((section, ind) => {

            if (!section.is_active) return null;

            {/* <HomeBannerSection uniqueKey={`_0${ind + 1}-${section.renderCount}-${section.index}-`} key={section.index} useFormPropObj={useFormPropObj} body={section.body} />; */ }
            {/* CREATE A SECTION WITH  4-5 Inputs + IMg || Video */ }

            switch (section.label) {
              case 'main_banner':
                return (
                  <HomeBannerSection uniqueKey={`${ind}-main_banner`} key={section.index} useFormPropObj={useFormFeaturesPropObj} body={section.body} targetArr={[
                    { placeholder: 'Banner Title', target: `${ind}-main_banner.body.title`, label: '', value: section.body.title },
                    // { placeholder: 'Banner desc', target: `${ind}-main_banner.body.desc`, label: '', value: section.body.desc },
                  ]} />
                );

              case 'text_img_section':
                return (
                  <HomeBannerSection uniqueKey={`${ind}-text_img_section`} key={section.index} useFormPropObj={useFormFeaturesPropObj} body={section.body} targetArr={[
                    // { placeholder: ' Title', target: `${ind}-text_img_section.body.title`, label: '', value: section?.body?.title ?? '' },
                    { placeholder: 'Description', target: `${ind}-text_img_section.body.desc`, label: '', value: section?.body?.desc ?? '' },
                    { placeholder: 'Sub Title', target: `${ind}-text_img_section.body.sub_title`, label: '', value: section?.body?.sub_title ?? '' },
                  ]} />
                );

              case 'team_section':
                return (
                  <Grid item xs={12} key={section.index}>
                    {/* USE HOME CHOOSE US SECTION HERE AND ADD STACK  */}
                    <HomeChooseUsSection targetArr={[
                      { placeholder: ' Title', target: `${ind}-team_section.body.title`, label: '', value: section?.body?.title ?? '' },
                      { placeholder: ' Description', target: `${ind}-team_section.body.description`, label: '', value: section?.body?.description ?? '' },

                    ]} key={section.index} uniqueKey={`${ind}-team_section.body`} arrName={'dynamic_section'} arrFromFirebase={section.body.dynamic_section} useFormPropObj={useFormFeaturesPropObj} body={section.body} />

                    {/* <TitleWithMultipleImgs uniqueKey={`${ind}-team_section.body`} useFormPropObj={useFormFeaturesPropObj} body={section.body}
                          targetArr={[
                            { placeholder: 'Title', target: `${ind}-team_section.body.title`, label: '', value: section?.body?.title ?? '' },
                          ]}
                        /> */}
                  </Grid>
                );
              case 'slider_section':
                return (
                  <Grid item xs={12} key={section.index}>
                    <TitleWithMultipleImgs uniqueKey={`${ind}-slider_section.body`} useFormPropObj={useFormFeaturesPropObj} body={section.body}
                      targetArr={[
                        { placeholder: 'Title', target: `${ind}-slider_section.body.title`, label: '', value: section?.body?.title ?? '' },
                      ]}
                    />
                  </Grid>
                );

              case 'responsive_banner':
                return (
                  <HomeBannerSection uniqueKey={`${ind}-responsive_banner`} key={section.index} useFormPropObj={useFormFeaturesPropObj} body={section.body} targetArr={[
                    { placeholder: 'Desktop Title', target: `${ind}-responsive_banner.body.desktop_banner_text`, label: '', value: section?.body?.desktop_banner_text ?? '' },
                    { placeholder: 'Desktop Button Text', target: `${ind}-responsive_banner.body.desktop_btn_text`, label: '', value: section?.body?.desktop_btn_text ?? '' },
                    // { placeholder: 'Desktop Button Link', target: `${ind}-responsive_banner.body.desktop_btn_link`, label: '', value: section?.body?.desktop_btn_link ?? '' },
                    { placeholder: 'Mobile Title', target: `${ind}-responsive_banner.body.mobile_banner_text`, label: '', value: section?.body?.mobile_banner_text ?? '' },
                    { placeholder: 'Mobile Button Text', target: `${ind}-responsive_banner.body.mobile_btn_text`, label: '', value: section?.body?.mobile_btn_text ?? '' },
                    { placeholder: 'Button Link', target: `${ind}-responsive_banner.body.btn_link`, label: '', value: section?.body?.btn_link ?? '' },
                    // { placeholder: 'Mobile Button Link', target: `${ind + 1}-responsive_banner.body.mobile_btn_link`, label: '', value: section?.body?.mobile_btn_link ?? '' },
                  ]} />
                );

              case 'icons_section':
                return (
                  <HomeChooseUsSection key={section.index} uniqueKey={`${ind}-icons_section.body`} arrName={'dynamic_section'} arrFromFirebase={section.body.dynamic_section} useFormPropObj={useFormFeaturesPropObj} body={section.body} />
                );


              default:
                return null;
            }
          })}
          {/* <TitleAndBtnRow data={{
            text: 'About Us Page Customization',
            onClick: onSubmit
          }} styles={{
            margin: '0 0  1em 0'
          }}
          /> */}
          {/* FIRST SECTION */}
          {/* <AboutUsFirstBanner useFormPropObj={useFormFeaturesPropObj} />

          <AboutUsSecondBanner useFormPropObj={useFormFeaturesPropObj} />

          <AboutUsThirdBanner useFormPropObj={useFormFeaturesPropObj} />

          <AboutUsFourthBanner useFormPropObj={useFormTeamsPropObj} />

          <AboutUsFifthBanner useFormPropObj={useFormFeaturesPropObj} />

          <AboutUsSixthBanner useFormPropObj={useFormFeaturesPropObj} /> */}


        </ChipContainer>
      </form>
    </Grid>
  )
};

export default AboutUs;