import React from 'react';
import FlexContainer from '../Containers/FlexContainer';
import InputFieldComp from './InputFieldComp';


const sampleBannerSectionArr = [
    { placeholder: 'Banner Title', target: 'firstBannerObj.bannerTitle', label: '' },
    { placeholder: 'Support Text', target: 'firstBannerObj.supportText', label: '' },
    { placeholder: 'CTA Title', target: 'firstBannerObj.ctaTitle', label: '' },
    { placeholder: 'URL Handle', target: 'firstBannerObj.urlHandle', label: '' },
];

const InputsStackComp = ({dataObj,useFormPropObj, styles, grid}) => {
// console.log(dataObj?.arrToMap)
  return (
    <FlexContainer grid={grid ?? 6} styles={{
            // justifyContent: 'start',
            flexDirection: 'column',
            alignItems: styles?.alignItems
        }}>
            {(dataObj?.arrToMap || sampleBannerSectionArr).map((item, index) => (
                <InputFieldComp
                    key={index}
                    dataObj={{
                        placeholder: item?.placeholder ?? item ?? '',
                        target: item?.target ?? item ??'',
                        label: item?.placeholder ?? item?.label ?? '',
                        value: item?.value ??  item ??''
                    }}
                    styles={{ margin: '0.7em 0 0 0', width: styles?.width }}
                    useFormPropObj={useFormPropObj}
                />
            ))}
        </FlexContainer>
  )
}

export default InputsStackComp
