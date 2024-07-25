import React from 'react'
import ImageContainerWithBtns from './ImageContainerWithBtns';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import InputsStackComp from '@/components/Widgets/SharedWidgets/InputFields/InputsStackComp';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';

const DynamicStackWithImg = ({ useFormPropObj, uniqueKey, targetArr, dynamicSectionsArr }) => {
    const { formName, setValue } = useFormPropObj;
console.log(dynamicSectionsArr)
    return (
        <>
            <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', margin: '1em 0 0 0' }} >
                <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
                    <DynamicTitle text={'Banner 01'} styles={{ padding: '0 0 0.3em 1em' }} />
                </FlexContainer>
                <FlexContainer grid={12} styles={{ flexDirection: 'row', alignItems: 'flex-start' }} >
{/* {dynamicSectionsArr?.nav_data?.map((x,i) => {
    return(

    
    <FlexContainer key={i} grid={6} >
    <FlexContainer grid={6} >
      <InputFieldComp
       dataObj={{
           placeholder: x.label,
           target: `${x.label ?? 'bannerTitle'}`,
           label: x.label
       }}
       styles={{ margin: '0.7em 0 0 0', width: '97%' }}
       useFormPropObj={useFormPropObj}
   />  
</FlexContainer>
<FlexContainer grid={6} >
<InputFieldComp
       dataObj={{
           placeholder: 'Banner Title',
           target: `${x.link ?? 'bannerTitle'}`,
           label: 'Banner Title'
       }}
       styles={{ margin: '0.7em 0 0 0', width: '97%' }}
       useFormPropObj={useFormPropObj}
   />  
</FlexContainer>

    </FlexContainer>
    ) 
})} */}
  <InputsStackComp grid={6} dataObj={{
                            arrToMap: dynamicSectionsArr?.nav_data?.map((ele, ind) => {
                                console.log(ele.label)
                                return ele.label
                            }),

                        }} useFormPropObj={useFormPropObj} />
                    <InputsStackComp dataObj={{
                        // arrToMap: targetArr,
                        arrToMap: dynamicSectionsArr?.nav_data?.map((ele, ind) => {
                            console.log(ele.label)
                            return ele.link
                        }),

                    }} useFormPropObj={useFormPropObj} />


                    <FlexContainer grid={12} styles={{ margin: '10px 0 0 0' }} >

                        <ImageContainerWithBtns
                            imageSrc={ dynamicSectionsArr?.nav_logo ? useFormPropObj.getValues(`${formName}.imgSrc`) : useFormPropObj.getValues(`${formName}.body.imgSrc`)}
                            target={ dynamicSectionsArr?.nav_logo ? `${formName}.imgSrc` : `${formName}.body.imgSrc`}
                            useFormPropObj={useFormPropObj}
                            placeholderSrc="https://via.placeholder.com/300x200?text=No+Image"

                        // onImageChange={handleImageChange}
                        // onImageRemove={handleImageRemove}
                        />
                        {/* <button onClick={() => setImage({ src: 'https://via.placeholder.com/300', alt: 'Larger Placeholder Image', width: 300, height: 300 })}>Load Larger Image</button> */}
                    </FlexContainer>
                </FlexContainer>
            </ChipContainer>
        </>
    );
}

export default DynamicStackWithImg