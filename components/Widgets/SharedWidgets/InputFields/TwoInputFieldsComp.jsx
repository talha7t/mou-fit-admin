import React from 'react'
import InputFieldComp from './InputFieldComp'

const TwoInputFieldsComp = ({ useFormPropObj, dataObj, styles }) => {
    return (
        <>
            <InputFieldComp
                dataObj={{
                    placeholder: dataObj?.firstInput?.placeholder ?? 'Heading',
                    target: dataObj?.firstInput?.target ?? 'secondBannerObj.heading',
                    label: dataObj?.firstInput?.placeholder ?? 'Heading'
                }}
                styles={{ margin: styles?.margin ?? '0.7em 0 0 0', width: styles?.width ?? '97%' }}
                useFormPropObj={useFormPropObj}
            />

            <InputFieldComp
                dataObj={{
                    placeholder: dataObj?.secondInput?.placeholder ?? 'Sub Heading',
                    target: dataObj?.secondInput?.target ?? 'secondBannerObj.subHeading',
                    label: dataObj?.secondInput?.placeholder ?? 'Sub Heading'
                }}
                styles={{ margin: styles?.margin ?? '0.7em 0 0 0', width: styles?.width ??  '97%' }}
                useFormPropObj={useFormPropObj}
            />
        </>
    )
}

export default TwoInputFieldsComp
