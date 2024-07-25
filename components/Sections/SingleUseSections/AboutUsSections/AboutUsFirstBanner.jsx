import React from 'react'
import BannerWithInputAndImg from '../../SharedSections/BannerWithInputAndImg';

const AboutUsFirstBanner = ({ dataObj, useFormPropObj }) => {

    const { formName, setValue } = useFormPropObj;

    return (
        <BannerWithInputAndImg dataObj={{
            inputTarget: 'firstBanner.bannerTitle',
            imgTarget: 'firstBanner.bannerImg',
        }} useFormPropObj={useFormPropObj}
        />
    )
};

export default AboutUsFirstBanner;