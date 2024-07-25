import React from 'react';
import BannerWithInputAndImg from '../../SharedSections/BannerWithInputAndImg';

const SubscriprionFirstSection = ({ useFormPropObj, uniqueKey }) => {
    return (
        <BannerWithInputAndImg dataObj={{
            inputTarget: 'firstBanner.title',
            imgTarget: 'firstBanner.imgSrc',
        }} useFormPropObj={useFormPropObj}
        />
    )
};

export default SubscriprionFirstSection;