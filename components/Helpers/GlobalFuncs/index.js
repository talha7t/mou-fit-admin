export const getFilteredKeysArr = async (objToMap, useFormPropObj,arrWithVals) => {
  const { watch, formName, getValues, setValue } = useFormPropObj;

  let tempArr = [];
  let sortedArr = [];

  Object?.keys(objToMap ?? `${watch()}.${formName ?? "hCPForm"}`)?.map((x, i) => {
    // console.log(x);
    let orginalKeyValMatch = x?.includes("-");
    // let undefinedCheck = x?.substring(x.indexOf('-') + 1);
    // console.log(undefinedCheck)
    // console.log(x?.includes("undefined"))


    if (
      getValues(`${useFormPropObj.formName}.${x}`) !== null && !x?.includes("undefined") &&  orginalKeyValMatch
    ) {
      // setValue(`${formName ?? "hCPForm"}.${x}.index`,arrWithVals[i]?.index )
      // console.log(arrWithVals[i]?.index)
      // console.log(arrWithVals[i])
      // console.log(arrWithVals)


      // x.index = arrWithVals[i]?.index
      tempArr.push(x);
      // tempArr[i].index = arrWithVals[i]?.index
    };
  });

  // return tempArr;
  // @@ SORTING BASED ON INT VAL !!
  sortedArr = tempArr?.sort((a, b) => {
    let tempStrA = a?.substring(0, a.indexOf("-"));
    let tempStrB = b?.substring(0, b.indexOf("-"));
    // console.log(tempStrA);
    return parseInt(tempStrA) - parseInt(tempStrB);
  });
  return sortedArr;

};

export const getFilteredValsArr = async(arrForMap,useFormPropObj,arrWithVals) => {

  const {formName,getValues} = useFormPropObj; 
  let tempArr = [];
  
  arrForMap?.map((x,i) => {

  let tempWatchVal = `${formName}.${x}`;
  let val = getValues(tempWatchVal);
  if(val.label === "slider_section" && typeof val.related_parent === "boolean"){
    // val.body.imgs_arr = []
  }
  // if(typeof val.index === "number"){
  //   // console.log('index exist', arrWithVals[i].index);

  //   // val.body.
  // }else{
  //   if(arrWithVals && arrWithVals.length >=1){
  //     // val.index = arrWithVals[i].index;

  //     console.log('index do not exist, now changed !');
  //   }
  // }
  if(val.hasOwnProperty("index")&&val.hasOwnProperty("label")){

    tempArr.push(val);
  }
});

  return tempArr;
}

export const moveImgsArrIntoNewDoc = async (
  extractedFinalArr,
  useFormPropObj
) => {
  const { formName, getValues, setValue } = useFormPropObj;

  extractedFinalArr?.map((x, i) => {

    let tempStr = `${x?.index ?? i}-${x.label}`;
    let tempObj = getValues(`${formName ?? "hCPForm"}.${tempStr}`);
    let strForImgsArr = `${formName}.${x?.index ?? i}-imgs_arr`;

    if (x.label === "slider_section") {
      let tempObj = {
        ...x,
        related_parent: i,
        // body: {
        //   imgs_arr: extractedFinalArr[i]?.body?.imgs_arr,
        // },
      };

      setValue(strForImgsArr, tempObj ?? []);

      setValue(`${formName}.${tempStr}`, extractedFinalArr[i]);

     
    } else {
      let tempObj = {
        ...x,
        related_parent: false,
      };

      // if(tempObj?.body?.imgs_arr){
      //   delete tempObj?.body?.imgs_arr;
      // };

      setValue(`${formName}.${i}-${x.label}`, tempObj ?? []);
    }
  });
};

export const separateImgsArrDynamically = (
  dynamicSectionsArr,
  useFormPropObj,
  testArr
) => {
  let hCPFormValues = Object.values(useFormPropObj?.watch().hCPForm);
  let tempArr = dynamicSectionsArr;
  let newArr = testArr;
  let newFormValues = hCPFormValues;
  let newLogicArr = [];
  // console.log("hCPFormValues", hCPFormValues);
  // console.log("newFormValues", newFormValues);
  // console.log("tempArr", tempArr);

  let finalFormValues = newArr.map((x, i) => {
    let hasRelatedParent = x?.body?.hasOwnProperty("imgs_arr");

    if (hasRelatedParent) {
      // console.log('x.hasOwnProperty("imgs_arr")')
      // console.log(`x==>${JSON.stringify(x)}`)
      console.log(`${x.index}-${x.label}==>${x}`);

      // let tempImgsArr = x?.body?.imgs_arr
      let tempNewTempObj = {
        ...x,
        // body: {
        //   imgs_arr: x?.body?.imgs_arr,
        // },
      };

      // useFormPropObj?.setValue(
      //   `${useFormPropObj?.formName}.${x.index}-${x.label}.body.imgs_arr`,
      //   tempNewTempObj
      // );

      // delete x?.body?.imgs_arr;
      useFormPropObj?.setValue(
        `${useFormPropObj?.formName}.${x.index}-${x.label}.body.related_patient`,
        `${x.index}`
      );

      // useFormPropObj?.setValue(
      //   `${useFormPropObj?.formName}.${x.index}-${x.label}.body.imgs_arr`,
      //   []
      // );
      // useFormPropObj?.setValue(`${useFormPropObj?.formName}.${x.index}-${x.label}.imgs_arr`, []);

      console.log("newLogicArr", newLogicArr);
      console.log(
        useFormPropObj?.getValues(
          `${useFormPropObj?.formName}.${x.index}-${x.label}`
        )
      );

      // x.parent_related =
      newLogicArr.push(x);
      // console.log('...x',JSON.stringify({...x}))
      // console.log('x',x)

      return { ...x };
    } else {
      newLogicArr.push(x);
      useFormPropObj?.setValue(
        `${useFormPropObj?.formName}.${x.index}-${x.label}.body.related_patient`,
        false
      );

      return { ...x };
    }
  });
  console.log("finalFormValues", finalFormValues);
  console.log("newLogicArr", newLogicArr);
  console.log(useFormPropObj?.watch());
  return newLogicArr;
};

// @@ EXTRACT FINAL VALUES BEFORE UPDATING DATA IN FIREBASE !!!
export const extractPropertiesFromObj = (arr, formName, getValues) => {
  return arr.map((obj) => {
    const { index, label, body, is_active, related_parent } = obj;
    // let newBody = {};
    let newVal = getValues(`${formName}.${index}-${label}.body`);
    
    return { index, label, body:newVal, is_active, related_parent };
  });
};

// @@ REMOVE THIS FUNC !!
export const returnRelatedParentEntries = (arr) => {
  let finalArrWithKeys = [];
  try {
    if (arr) {
      arr?.map((x, i) => {
        let hasRelatedParent = x?.hasOwnProperty("related_parent");
        if (hasRelatedParent) {
          // console.log(x);
          finalArrWithKeys.push(x);
        }
      });
    }
    return finalArrWithKeys;
  } catch (err) {
    console.error(err);
  }
};

export const addRenderCountParamInArr = (sections) => {
  const labelCounts = {};
console.log('sections.map',sections)
  return sections?.map((section) => {
    if(section?.label){

    
    const label = section?.label;
    const count = labelCounts[label] || 0;
    labelCounts[label] = count + 1;

    return {
      ...section,
      body: {
        ...section.body,
        renderCount: count + 1,
      },
    };
  }
  });
};

// @@ REMOVE EXTRA VALUES FROM MAIN OBJ
export const removePropertiesFromBody = (parentObj) => {
  const modifiedParentObj = parentObj?.map((obj) => {
    if (obj?.body && typeof obj.body === "object") {
      const { index, label, is_active, ...bodyWithoutProperties } = obj.body;
      obj.body = bodyWithoutProperties;
    }
    return obj;
  });

  return modifiedParentObj;
};

// @@ REMOVE NESTED BODY INSIDE BODY OBJ !!!
export const addMissingKeys = (parentObj) => {
  const modifiedParentObj = parentObj.map((obj) => {
    if (
      obj.body &&
      typeof obj.body === "object" &&
      obj.body.body &&
      typeof obj.body.body === "object"
    ) {
      const childBody = obj.body.body;
      const parentBody = obj.body;

      Object.keys(childBody).forEach((key) => {
        if (!(key in parentBody)) {
          parentBody[key] = childBody[key];
        }
      });

      delete obj.body.body;
    }

    return obj;
  });

  return modifiedParentObj;
};
