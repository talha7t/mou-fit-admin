import Image from 'next/image';
import React from 'react';

import Img from '../public/images/404Img.png';

const Custom404 = () => {
  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <div style={containerStyles}>
      <Image src={Img} alt='404 img' style={{width: '20rem', height: '20rem'}} />
    </div>
  );
};

export default Custom404;
