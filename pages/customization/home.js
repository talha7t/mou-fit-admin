import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { homePageSampleData } from "@/components/Utils/StaticData/homePageData";
import {
  updateOrCreateDocumentsByKeys,
  getDynmaicSectionsFromOldFirebase,
  updateDynmaicSectionsInOldFirebase,
  getAllDocsWithinCollection,
} from "@/components/Helpers/ApiCalls/firebaseApiCalls";
import {
  extractPropertiesFromObj,
  getFilteredKeysArr,
  getFilteredValsArr,
  moveImgsArrIntoNewDoc,
  separateImgsArrDynamically,
} from "@/components/Helpers/GlobalFuncs";
import HomeCustomizationView from "@/components/View/HomeCustomizationView";
import { oldDB } from "@/components/firebase-config";

const Home = () => {
  // let padding = '4em 0 0 ';

  // const [dynamicSectionsArr, setDynamicSectionsArr] = useState(homePageSampleData || []);
  const [dynamicSectionsArr, setDynamicSectionsArr] = useState([]);

  const {
    control,
    register,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hCPForm: {
        // dynamicSectionsArr: homePageSampleData || [],

        dynamicSectionsArr: [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "accordions",
  });

  const useFormPropObj = {
    formName: "hCPForm",
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
    console.log(e?.preventDefault());
    // console.log(watch());
    // console.log(dynamicSectionsArr);
    try {
      console.log("watch", watch());
      
      // console.log('extractProperties(dynamicSectionsArr)', extractPropertiesFromObj(getValues('hCPForm.dynamicSectionsArr')))
      let extractedFinalArr = extractPropertiesFromObj(
        getValues("hCPForm.dynamicSectionsArr"),'hCPForm', getValues
      );

       await moveImgsArrIntoNewDoc(
        extractedFinalArr,
        useFormPropObj
      );

      //  console.log('moveImagesProcess',moveImagesProcess)

      console.log("extractedFinalArr", extractedFinalArr);

   
      let finalFilteredKeysArr = [];
      let finalFilteredValsArr = [];

      finalFilteredKeysArr = await getFilteredKeysArr(watch().hCPForm,useFormPropObj) || [];
      finalFilteredValsArr = await getFilteredValsArr(finalFilteredKeysArr,useFormPropObj) || [];

      console.log("finalsortedFilteredKeysArr", finalFilteredKeysArr);
      console.log("finalFilteredValsArr", finalFilteredValsArr);
      // setValue('hCPForm.dynamicSectionsArr', finalFilteredValsArr);
      // setDynamicSectionsArr(finalFilteredValsArr);

            let tempResp = await updateOrCreateDocumentsByKeys(oldDB,'home_dynamic_approach_test', finalFilteredKeysArr,finalFilteredValsArr)

      console.log(tempResp);
  
    } catch (err) {
      console.log(err);
    }
  };

//   const onSubmit = async (e) => {
//     // e?.preventDefault();
//     // console.log(watch());
//     // console.log(dynamicSectionsArr);
//     try {

//       console.log("watch", watch());
//       const tempDataObj = watch().hCPForm;
//       console.log(getValues('hCPForm.dynamicSectionsArr'))
//       // let tempArr = await getFilteredKeysArr(tempDataObj, useFormPropObj,tempDataObj?.dynamicSectionsArr || []);
//       // let tempValArr = await getFilteredKeysArr(tempDataObj, useFormPropObj);
//       let finalNeededArr = [];
//       // tempArr.map((x,i) => {

//       //   let tempStr = `${useFormPropObj.formName}.${x}`;
//       //   let tempCheck = getValues(tempStr);
//       //   // if(tempCheck && tempCheck.hasOwnProperty("index")){
//       //     console.log('tempCheck',tempCheck)
//       //     tempCheck.index = getValues(`hCPForm.dynamicSectionsArr[${i}].index`)
//       //     // tempCheck.label = getValues(`hCPForm.dynamicSectionsArr[${i}].label`)
//       //     // tempCheck.is_active = getValues(`hCPForm.dynamicSectionsArr[${i}].is_active`)
//       //     // tempCheck.related_parent = getValues(`hCPForm.dynamicSectionsArr[${i}].related_parent`)
//       //     // setValue(`hCPForm.dynamicSectionsArr[${i>=1 ? i-1:i}].body`, tempCheck.body)
  
  
//       //     // setValue(tempStr, tempCheck)
//       //     finalNeededArr.push(tempCheck);
      
//       //   // }
//       //   // setValue(`${useFormPropObj.formName}.dynamicSectionsArr[${i}].body`, finalNeededArr[i].body);
//       //   // if(tempCheck && tempCheck?.hasOwnProperty("imgs_arr")){
//       //     // finalNeededArr[i].index = getValues(`hCPForm.dynamicSectionsArr[${i}].index`)
//       //     // finalNeededArr[i].index = tempCheck.index

//       //   // }
//       //   // console.log(tempCheck);

//       // })
//       // console.log('tempArr',tempArr);
//       // let arrWithNeededParams = finalNeededArr.map(x=>{
//         //   if(x.index)
//       //   finalNeededArr.
//       // })


//       // @@ LOOP OVER ARRAY WHICH HAVE ALL UPDATED INDEX, STATUS && OTHER PARAMS, SO IT CAN BE USE THOSE PARAMS 
//       // console.log('tempValArr',tempValArr);

      
//       // tempDataObj
      
//       // console.log('extractProperties(dynamicSectionsArr)', extractPropertiesFromObj(finalNeededArr))
//       // @@ SEND getValues('hCPForm.dynamicSectionsArr') but replace it's body with getValues(`${useFormPropObj.formName}.{x.index}-{x.label}.body`)
//       getValues('hCPForm.dynamicSectionsArr').map((item,itemIndex)=>{
//         // finalNeededArr[itemIndex].body = getValues(`${useFormPropObj.formName}.${item.index}-${item.label}.body`);
//         let tempItem = item;
//       console.log('tempItem',tempItem);

//         // tempItem.body = getValues(`${useFormPropObj.formName}.${item.index}-${item.label}.body`);
//         finalNeededArr.push(tempItem)
//       })
//       console.log('finalNeededArr',finalNeededArr);
//       let extractedFinalArr = extractPropertiesFromObj(finalNeededArr );
//       // let testFinalArr = extractPropertiesFromObj(dynamicSectionsArr );


//        const extraVar = await moveImgsArrIntoNewDoc(
//         extractedFinalArr,
//         useFormPropObj
//       );
//       let finalFilteredKeysArr = [];
//       let finalFilteredValsArr = [];

//       // finalFilteredKeysArr = await getFilteredKeysArr(watch().hCPForm,useFormPropObj) || [];
//       // finalFilteredValsArr = await getFilteredValsArr(finalFilteredKeysArr,useFormPropObj) || [];

//       console.log("extractedFinalArr", extractedFinalArr);
//       // console.log("testFinalArr", testFinalArr);

//       // console.log("finalsortedFilteredKeysArr", finalFilteredKeysArr);
//       // console.log("finalFilteredValsArr", finalFilteredValsArr);
// console.log(watch())
//        // let tempResp = await updateOrCreateDocumentsByKeys(oldDB,'home_dynamic_approach_test', finalFilteredKeysArr,getValues,finalFilteredValsArr)
//       // let tempResp = await updateOrCreateDocumentsByKeys(oldDB,'home_dynamic_approach_test', finalFilteredKeysArr,finalFilteredValsArr)

//       // console.log(tempResp);








//       //  console.log('moveImagesProcess',moveImagesProcess)

//       // console.log("extractedFinalArr", extractedFinalArr);

//       // setDynamicSectionsArr(extractedFinalArr);
//       // console.log("after watch", watch());

     

//       // let sortedFilteredArr = finalFilteredKeysArr.sort((a, b) => a - b)
//       // finalFilteredKeysArr.sort((a, b) => {
//       //   let tempStrA = a?.substring(0, a.indexOf("-"));
//       //   let tempStrB = b?.substring(0, b.indexOf("-"));
//       //   console.log(tempStrA);
//       //   return parseInt(tempStrA) - parseInt(tempStrB);
//       // });
      
//       // console.log('finalFilteredKeysArr',finalFilteredKeysArr.sort((a, b) => a.index - b.index))
//       // console.log('sortedFilteredArr',sortedFilteredArr)
      

      
//       // finalFilteredKeysArr.map((x) => {
//       //   let tempWatchVal = `${formName}.${x}`;
//       //   // let tempWatchVal = `hCPForm.${x}`;

//       //   finalFilteredValsArr.push(getValues(tempWatchVal));
//       // });
//       // console.log('finalFilteredValsArr',finalFilteredValsArr)


     
//       // console.log('hCPForm.dynamicSectionsArr', getValues('hCPForm.dynamicSectionsArr'))
//       // console.log('extractProperties(dynamicSectionsArr)', extractPropertiesFromObj(dynamicSectionsArr))

//       // updateDynmaicSectionsInOldFirebase('test_collection', 'home_test_page', getValues('hCPForm.dynamicSectionsArr'));
//       // setDynamicSectionsArr(extractedFinalArr);
//       // if(typeof(dynamicSectionsArr) === 'string'){
//       //   console.alert('img size exceeded!')
//       // }
      
//     } catch (err) {
//       console.log(err);
//     }
//   };

  useEffect(() => {
    console.log(watch());
    try {
      const fetchSections = async (respArr) => {
        return await getAllDocsWithinCollection('home_dynamic_approach_test')
      };
      let resp = fetchSections().then(data => {
        console.log(data)
        setDynamicSectionsArr(data);
        setValue("hCPForm.dynamicSectionsArr", data);
  
        data.map((y,yInd) => {
          setValue(`hCPForm.${y.index}-${y.label}`, getValues(`hCPForm.dynamicSectionsArr[${yInd}]`))
        })
  
      })
      console.log(resp);
    } catch (err) {
      console.log(err);
    }

     }, [watch]);

  useEffect(() => {}, [dynamicSectionsArr]);

  return (
    <>
      <HomeCustomizationView
        dynamicSectionsArr={getValues("hCPForm.dynamicSectionsArr") ?? []} // ?? dynamicSectionsArr
        useFormPropObj={useFormPropObj}
        methodsObj={{
          onSubmit,
          setDynamicSectionsArr,
          handleSubmit,
        }}
      />
    </>
  );
};

export default Home;
