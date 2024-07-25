import React from 'react'
import BannerWithInputAndImg from '../../SharedSections/BannerWithInputAndImg'

const HowItWorksFirstBanner = ({ dataObj, useFormPropObj }) => {
    return (
        <BannerWithInputAndImg dataObj={{
            inputTarget: 'firstBannerObj.bannerTitle',
            imgTarget: 'firstBannerObj.bannerImg',
        }} useFormPropObj={useFormPropObj} />
    )
}

export default HowItWorksFirstBanner
