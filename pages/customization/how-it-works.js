import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Grid } from '@mui/material';

import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import HowItWorksFirstBanner from '@/components/Sections/SingleUseSections/HowItWorksSections/HowItWorksFirstBanner';
import HowItWorksSecondBanner from '@/components/Sections/SingleUseSections/HowItWorksSections/HowItWorksSecondBanner';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import { howItWorksPageAvailableSections, howItWorksSampleData } from '@/components/Utils/StaticData/howItWorksPageData';
import HomeChooseUsSection from '@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeChooseUsSection';
import HomeBannerSection from '@/components/Sections/SingleUseSections/HomeCustomizationSections/HomeBannerSection';
import CustomDynamicAccordionWithList from '@/components/Widgets/SharedWidgets/Accordion/CustomDynamicAccordionWithList';
import TitleWithMultipleImgs from '@/components/Sections/SharedSections/TitleWithMultipleImgs';
import SingleColWithImg from '@/components/Widgets/SharedWidgets/ColSections/SingleColWithImg';
import { addRenderCountParamInArr, extractPropertiesFromObj, getFilteredKeysArr, getFilteredValsArr, moveImgsArrIntoNewDoc } from '@/components/Helpers/GlobalFuncs';
import { getAllDocsWithinCollection, getDynmaicSectionsFromOldFirebase, updateDynmaicSectionsInOldFirebase, updateOrCreateDocumentsByKeys } from '@/components/Helpers/ApiCalls/firebaseApiCalls';
import { oldDB } from '@/components/firebase-config';

const HowItWorks = () => {
                                                // howItWorksSampleData || 
    const [dynamicSectionsArr, setDynamicSectionsArr] = useState([]);

    const { control, register, getValues, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            HowItWorksForm: {
                firstBannerObj: {
                    bannerTitle: '',
                    bannerImg: '',
                },
                secondBannerObj: {
                    heading: '',
                    subHeading: '',
                    imgUrl: '',
                },
                dynamicSectionsArr: [],

            }
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'accordions',
    });

    const useFormPropObj = {
        formName: 'HowItWorksForm',
        register,
        getValues,
        setValue,
        watch,
        control,
        fields,
        append,
        remove,
    };

    // const onSubmit = async (data) => {
    //     // console.log(data);
    //     console.log(watch())
    //     console.log(dynamicSectionsArr)

    //     dynamicSectionsArr.map((x, i) => {
    //         let tempStr = `${x.index}-${x.label}`
    //         let tempObj = getValues(`HowItWorksForm.${tempStr}`)
    //         // console.log(tempObj.body)
    //         dynamicSectionsArr[i].body = tempObj.body;
    //     })

    //     console.log('dynamicSectionsArr', dynamicSectionsArr)
    //     console.log('extractProperties(dynamicSectionsArr)', extractPropertiesFromObj(dynamicSectionsArr))

    //     // updateDynmaicSectionsInOldFirebase('test_collection', 'how_it_works_test_page', extractPropertiesFromObj(dynamicSectionsArr));

    // };

    const onSubmit = async (e) => {
        // console.log(e?.preventDefault());
        // console.log(watch());
        // console.log(dynamicSectionsArr);
        try {
          console.log("watch", watch());
    
          // console.log('extractProperties(dynamicSectionsArr)', extractPropertiesFromObj(getValues('HowItWorksForm.dynamicSectionsArr')))
          let extractedFinalArr = extractPropertiesFromObj(
            getValues("HowItWorksForm.dynamicSectionsArr"),
            "HowItWorksForm",
            getValues
          );
    
          await moveImgsArrIntoNewDoc(extractedFinalArr, useFormPropObj);
    
          //  console.log('moveImagesProcess',moveImagesProcess)
    
          console.log("extractedFinalArr", extractedFinalArr);
    
          let finalFilteredKeysArr = [];
          let finalFilteredValsArr = [];
    
          finalFilteredKeysArr =
            (await getFilteredKeysArr(watch().HowItWorksForm, useFormPropObj)) || [];
          finalFilteredValsArr =
            (await getFilteredValsArr(finalFilteredKeysArr, useFormPropObj)) || [];
    
          console.log("finalsortedFilteredKeysArr", finalFilteredKeysArr);
          console.log("finalFilteredValsArr", finalFilteredValsArr);
          // setValue('HowItWorksForm.dynamicSectionsArr', finalFilteredValsArr);
          // setDynamicSectionsArr(finalFilteredValsArr);
    
          let tempResp = await updateOrCreateDocumentsByKeys(
            oldDB,
            "how_it_works_dynamic_page",
            finalFilteredKeysArr,
            finalFilteredValsArr
          );
    
          console.log(tempResp);
        } catch (err) {
          console.log(err);
        }
      };
      
    let padding = '4em 0 0 ';

    useEffect(() => {
        console.log(watch());
        try {
          const fetchSections = async (respArr) => {
            return await getAllDocsWithinCollection("how_it_works_dynamic_page");
          };
          let resp = fetchSections().then((data) => {
            console.log(data);
            setDynamicSectionsArr(data);
            setValue("HowItWorksForm.dynamicSectionsArr", data);
    
            data?.map((y, yInd) => {
              setValue(
                `HowItWorksForm.${y.index}-${y.label}`,
                getValues(`HowItWorksForm.dynamicSectionsArr[${yInd}]`)
              );
            });
          });
          console.log(resp);
        } catch (err) {
          console.log(err);
        }
      }, [watch]);

    // useEffect(() => {
    //     console.log(watch());
    //     const fetchSections = async () => {
    //         // console.log(await getDynmaicSection('test_collection', 'home_test_page'))
    //         return await getDynmaicSectionsFromOldFirebase('test_collection', 'how_it_works_test_page')
    //     }
    //     // console.log(fetchSections().then(data => console.log(data.dynamic_sections)))
    //     fetchSections()
    //         .then(data => {
    //             let resp = data.dynamic_sections
    //             console.log(resp);
    //             // setDynamicSectionsArr(data.dynamic_sections);
    //             // setValue('HowItWorksForm.dynamicSectionsArr', data.dynamic_sections);

    //             let filteredKeysArr = []
    //             let keysArr = Object.keys(useFormPropObj?.watch()?.HowItWorksForm)
    //             keysArr.map((key, keyInd) => isNaN(key[0]) ? null : filteredKeysArr.push(Object.values(useFormPropObj?.watch()?.HowItWorksForm)[keyInd]))

    //             let tempArr = data.dynamic_sections;
    //             // let arrToChange = getValues('HowItWorksForm.dynamicSectionsArr');
    //             let finalArr = tempArr.map((x, i) => {
    //                 // arrToChange.body = x[i].body
    //                 // console.log(x)
    //                 // console.log(`${x.index}-${x.label}`)

    //                 // @@ SETTING EACH OBJ 
    //                 setValue(`HowItWorksForm.${x.index}-${x.label}`, x)

    //                 return x
    //             });
    //             console.log(watch());

    //             // console.log('finalArr', finalArr)

    //             //  @@ COMMENT THIS LINE TO NOT USE FIREBASE DATA !!!
    //             setDynamicSectionsArr(finalArr)
    //             setValue('HowItWorksForm.dynamicSectionsArr', finalArr)

    //         })
    //         .catch(err => console.error(err))
    //     // setValue('HowItWorksForm.dynamicSectionsArr', fetchSections())
    // }, [watch])
    return (
        <>
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
                <form style={{ width: '97%', marginRight: '1em' }} onSubmit={handleSubmit(onSubmit)}>

                    <ChipContainer styles={{
                        padding: '1em 1.3em',
                        margin: '0 0 1em 1em',
                    }} >

                        {/* Title && BUTTON ROW */}
                        <TitleAndBtnRow data={{ onClick: onSubmit, text: 'How It Works Page Customization', dynamicSectionsArr, setDynamicSectionsArr, availableSections: howItWorksPageAvailableSections }} useFormPropObj={useFormPropObj} styles={{ margin: '0 0  1em 0' }} />

                        {addRenderCountParamInArr(dynamicSectionsArr)?.map((section, ind) => {

                            if (!section.is_active) return null;

                            {/* <HomeBannerSection uniqueKey={`_0${ind + 1}-${section.renderCount}-${section.index}-`} key={section.index} useFormPropObj={useFormPropObj} body={section.body} />; */ }
                            {/* CREATE A SECTION WITH  4-5 Inputs + IMg || Video */ }

                            switch (section.label) {
                                case 'main_banner':
                                    return (
                                        <HomeBannerSection uniqueKey={`${ind}-main_banner`} key={section.index} useFormPropObj={useFormPropObj} body={section.body} targetArr={[
                                            { placeholder: 'Banner Title', target: `${ind}-main_banner.body.title`, label: '', value: section.body.title },
                                        ]}
                                        />
                                    );

                                case 'why_us_section':
                                    return (
                                        <Grid item xs={12} key={section.index}>
                                            <Grid item xs={12}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Grid item xs={5.8}>
                                                    <HomeChooseUsSection grid={12}
                                                        // styles={{ height: '100%' }}
                                                        uniqueKey={`${ind}-why_us_section.body.left_section.dynamic_section`} arrName={'right_col'} arrFromFirebase={section.body.left_section.dynamic_section.right_col} useFormPropObj={useFormPropObj} body={section.body} />;
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <HomeChooseUsSection grid={12} uniqueKey={`${ind}-why_us_section.body.left_section.dynamic_section`} arrName={'left_col'} arrFromFirebase={section.body.left_section.dynamic_section.left_col} useFormPropObj={useFormPropObj} body={section.body} />;
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} >

                                                <HomeBannerSection targetImgDirect={true} uniqueKey={`${ind}-why_us_section.body.right_section`} useFormPropObj={useFormPropObj} body={section.body} targetArr={[
                                                    { placeholder: 'Left Section Title', target: `${ind}-why_us_section.body.left_section.title`, label: '', value: section?.body?.left_section?.title ?? '' },
                                                    { placeholder: 'Desc', target: `${ind}-why_us_section.body.left_section.desc`, label: '', value: section?.body?.left_section?.desc ?? '' },
                                                    { placeholder: 'Button Text', target: `${ind}-why_us_section.body.left_section.btnText`, label: '', value: section?.body?.left_section?.btnText ?? '' },
                                                    { placeholder: 'Button Text', target: `${ind}-why_us_section.body.left_section.btnLink`, label: '', value: section?.body?.left_section?.btnLink ?? '' },

                                                    { placeholder: 'Right Section Title', target: `${ind}-why_us_section.body.right_section.title`, label: '', value: section?.body?.right_section?.title ?? '' },
                                                ]} />
                                            </Grid>
                                        </Grid>
                                    );

                                default:
                                    return null;
                            }
                        })}
                    </ChipContainer>
                </form>
            </Grid>
        </>
    )
};

export default HowItWorks;
