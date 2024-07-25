import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid } from '@mui/material';

import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import LocationsFirstBanner from '@/components/Sections/SingleUseSections/LocationsCustomizationSections/LocationsFirstBanner';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import { addRenderCountParamInArr, extractPropertiesFromObj } from '@/components/Helpers/GlobalFuncs';
import { locationsPageAvailableSections, locationsPageSampleData } from '@/components/Utils/StaticData/LocationsPageData';
import HomeBannerSection from '@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeBannerSection';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';
import InputsStackComp from '@/components/Widgets/SharedWidgets/InputFields/InputsStackComp';
import HomeChooseUsSection from '@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeChooseUsSection';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import { updateDynmaicSectionsInOldFirebase } from '@/components/Helpers/ApiCalls/firebaseApiCalls';


const Locations = () => {

  const [dynamicSectionsArr, setDynamicSectionsArr] = useState(locationsPageSampleData || []);

  const { register, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      locationsForm: {
        bannerTitle: '',
        bannerImg: '',
        dynamicSectionsArr: locationsPageSampleData || [],

      }
    }
  });
  const useFormPropObj = {
    formName: 'locationsForm',
    register,
    getValues,
    setValue,
    watch,
  };

  let padding = '4em 0 0 ';

  const onSubmit = async (data) => {
    // console.log(data);
    console.log(watch())
    console.log(dynamicSectionsArr)

    dynamicSectionsArr.map((x, i) => {
      let tempStr = `${x.index}-${x.label}`
      let tempObj = getValues(`locationsForm.${tempStr}`)
      // console.log(tempObj?.body ?? tempObj)
      // console.log(typeof(tempObj.body) === 'object' ? true : false)

      // console.log(dynamicSectionsArr[i].body)

      dynamicSectionsArr[i].body = tempObj.body;
    })

    console.log('dynamicSectionsArr', dynamicSectionsArr)
    console.log('extractProperties(dynamicSectionsArr)', extractPropertiesFromObj(dynamicSectionsArr))

    updateDynmaicSectionsInOldFirebase('test_collection', 'locations_test_page', extractPropertiesFromObj(dynamicSectionsArr));

  };

  useEffect(() => {
    console.log(watch());
  }, [watch]);

  useEffect(() => { }, [dynamicSectionsArr]);

  return (
    <Grid container
      sx={{
        padding: {
          sm: `${padding} 6em`,
          md: `${padding} 5em`,
          lg: `${padding} 1.2em`,
          xl: `${padding} 0em`
        },
      }}
      spacing={1}
    >
      <form style={{ width: '97%' }} onSubmit={handleSubmit(onSubmit)}>

        <ChipContainer styles={{
          padding: '1em 1.3em',
          margin: '0 0 0 1em',

        }} >
          {/* TITLE AND BTN ROW */}
          <TitleAndBtnRow data={{ onClick: onSubmit, text: 'Locations Page Customization', dynamicSectionsArr, setDynamicSectionsArr, availableSections: locationsPageAvailableSections }} useFormPropObj={useFormPropObj} styles={{ margin: '0 0  1em 0' }} />

          {addRenderCountParamInArr(dynamicSectionsArr).map((section, ind) => {

            if (!section.is_active) return null;

            {/* <HomeBannerSection uniqueKey={`_0${ind + 1}-${section.renderCount}-${section.index}-`} key={section.index} useFormPropObj={useFormPropObj} body={section.body} />; */ }

            switch (section.label) {
              case 'main_banner':
                return (

                  <HomeBannerSection uniqueKey={`${ind}-main_banner`} key={section.index} useFormPropObj={useFormPropObj} body={section.body} targetArr={[
                    { placeholder: 'Banner Title', target: `${ind}-main_banner.body.title`, label: '', value: section.body.title },
                  ]} />
                );

              case 'dynamic_tabs_section':
                return (

                  <Grid item xs={12} key={section?.index ?? ind} >

                    {getValues(`locationsForm.${ind}-dynamic_tabs_section.body.tabs_arr`) && getValues(`locationsForm.${ind}-dynamic_tabs_section.body.tabs_arr`).map((tabData, tabInd) => {
                      return (
                        <Grid item xs={12} sx={{ marginTop: '2em', backgroundColor: '#171821', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} key={tabInd} >
                          <DynamicTitle text={`Tab ${tabInd + 1} `} styles={{ fontSize: '1.2em', padding: '0.8em 0 0 1em', borderBottomStyle: 'double', marginBottom: '5px', width: '100%' }} />

                          <InputFieldComp
                            dataObj={{
                              placeholder: 'Tab Title',
                              target: `${ind}-dynamic_tabs_section.body.tabs_arr[${tabInd}].tab_label`,
                              label: 'Tab Title'
                            }}
                            styles={{ margin: '0.7em 0 0 0', width: '97%' }}
                            useFormPropObj={useFormPropObj}
                          />
                          {getValues(`locationsForm.${ind}-dynamic_tabs_section.body.tabs_arr[${tabInd}].slides`) && getValues(`locationsForm.${ind}-dynamic_tabs_section.body.tabs_arr[${tabInd}].slides`).map((singleTabData, singleTabInd) => {
                            return (
                              <>
                                          {/* Tab ${tabInd + 1} -- */}
                                {/* <DynamicTitle text={` Section ${singleTabInd + 1} `} styles={{ fontSize: '15px', padding: '0.5em 0 0.5em 1em', width: '100%' }} /> */}

                                <HomeChooseUsSection sectionTitle={` Section ${singleTabInd + 1} `} styles={{ border: '1px solid #c000ff', width: '97%', alignItems: 'flex-start' }} targetArr={[
                                  {
                                    placeholder: ` Section ${singleTabInd + 1} Title`, target: `${ind}-dynamic_tabs_section.body.tabs_arr[${tabInd}].slides[${singleTabInd}].title`, label: ` tab_sections[${singleTabInd}]`,
                                    // placeholder: ` tab_sections[${singleTabInd}]`, target: `${ind}-dynamic_tabs_section.body.tabs_arr[${tabInd}].slides[${singleTabInd}].description`, label: ` tab_sections[${singleTabInd}]`,

                                    // value: section?.body?.tabs_arr[tabInd]?.tab_sections[singleTabInd]?.slides[${singleTabInd}]?.title ?? ''
                                    value: ''
                                  },

                                ]} key={section.index} uniqueKey={`${ind}-dynamic_tabs_section.body.tabs_arr[${tabInd}].slides[${singleTabInd}]`} arrName={'tab_sections'}
                                  //  arrFromFirebase={section?.body?.tabs_arr[tabInd]?.tabs_sections}
                                  useFormPropObj={useFormPropObj} body={section.body} />

                              </>
                            )
                          })}
                          <Button onClick={(e) => {
                            e?.preventDefault();
                            // [${tabInd}].tab_sections
                            let tempArr = getValues(`locationsForm.${ind}-dynamic_tabs_section.body.tabs_arr[${tabInd}].slides`) || [];
                            tempArr.push({
                              title: ''
                            });
                            setValue(`locationsForm.${ind}-dynamic_tabs_section.body.tabs_arr[${tabInd}].slides`, tempArr)
                          }}   >Add SECTION in TAB +</Button>
                        </Grid>
                      )
                    })}
                    <Button onClick={(e) => {
                      e?.preventDefault();
                      let tempArr = getValues(`locationsForm.${ind}-dynamic_tabs_section.body.tabs_arr`) || [];
                      tempArr.push({ tab_label: '' });
                      setValue(`locationsForm.${ind}-dynamic_tabs_section.body.tabs_arr`, tempArr)
                    }}   >Add Tab +</Button>

                  </Grid>
                );


              default:
                return null;
            }
          })}

          {/* FIRST SECTION */}
          {/* <LocationsFirstBanner useFormPropObj={useFormPropObj} /> */}

        </ChipContainer>
      </form>
    </Grid>
  )
};

export default Locations;