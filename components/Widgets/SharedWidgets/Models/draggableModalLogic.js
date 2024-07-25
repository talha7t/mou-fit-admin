export const processArrayAndObject = (arr, obj) => {
  
  let newArray = [];
  let newObj = {};

  arr?.forEach((x, i) => {
    const calculatedValue = `${x?.index}-${x?.label}`;

    obj[`${x?.prevIndex ?? x?.index}-${x?.label}`].index = i;

    newObj[calculatedValue] = obj[`${x?.prevIndex ?? x?.index}-${x?.label}`];
    newArray.push(obj[`${x?.prevIndex ?? x?.index}-${x?.label}`]);
  });

  return { newArray, newObj };
};
export const nullifyUnUsedKeys = (prevKeysArr, fullKeysArr, useFormPropObj) => {
  const { formName, setValue } = useFormPropObj;

  prevKeysArr?.map((x) => {
    if (!fullKeysArr?.includes(x)) {
      setValue(`${formName}.${x}`, null);
    }
  });
};

export const extractNullAndFinalArr = (updatedSections, fullKeysArr) => {
  let finalArr = [];
  let nullArr = [];

  updatedSections?.map((x) => {
    // fullKeysArr.map((x,i) => {

    // let tempStr = `${updatedSections[i]?.index}-${updatedSections[i]?.label}`
    let tempStr = `${x?.index}-${x?.label}`;
    // x.body = useFormPropObj.getValues(`${useFormPropObj.formName}.${tempStr}`)

    if (fullKeysArr?.includes(tempStr)) {
      finalArr?.push(tempStr);
    } else {
      nullArr?.push(x);
    }
  });

  return {
    finalArr,
    nullArr,
  };
};
