import React from 'react';
import BannerWithInputAndImg from '../../SharedSections/BannerWithInputAndImg';

const ContactUsFirstBanner = ({ useFormPropObj, uniqueKey }) => {

    return (
        <BannerWithInputAndImg dataObj={{
            inputTarget: 'firstBanner.bannerTitle',
            imgTarget: 'firstBanner.bannerImg',
        }} useFormPropObj={useFormPropObj}
        />
    )
};

export default ContactUsFirstBanner;