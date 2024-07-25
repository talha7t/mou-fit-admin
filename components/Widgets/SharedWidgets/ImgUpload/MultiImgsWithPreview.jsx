import Image from 'next/image';
import React, { useState } from 'react';
import { RxCrossCircled } from 'react-icons/rx';

const MultiImgsWithPreview = ({ uniqueKey, useFormPropObj, pictures
  // ,renderCount 
}) => {
  const [images, setImages] = useState(pictures || []);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const updatedImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        updatedImages.push(reader.result);
        setImages([...updatedImages]);

        // @@ 1st APPROACH !!
        let uniqueKeyStr = new String(uniqueKey)
        let uniqueParentIndex = uniqueKeyStr?.substring(0, uniqueKey.indexOf('-'));
        // let replacedUniqueKey = uniqueKey.replace(`${uniqueParentIndex}`, `${uniqueParentIndex}-`) // 1-1
        // console.log(uniqueKey);
        // console.log(uniqueParentIndex);

        let tempKey =  uniqueKey;

        console.log('tempKey',tempKey);
        
        useFormPropObj?.setValue(`${useFormPropObj?.formName}.${uniqueKey}.imgs_arr`, [...updatedImages]);

      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    useFormPropObj?.setValue(`${useFormPropObj?.formName}.${uniqueKey}.imgs_arr`, [...updatedImages]);
    // console.log(useFormPropObj?.getValues(`${useFormPropObj?.formName}.${uniqueKey}.imgs_arr`))
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const styles = {
    imagePreview: {display: 'flex',flexWrap: 'wrap'},
    imageItem: {
      borderRadius: '5px',
    //   border: '1px solid black',
      marginTop: '10px',
      marginRight: '9px',
    //   width: '80px',
    //   height: '75px'
    },
    image: { border: '1px solid black', borderRadius: '5px'},
    deleteIcon: (index, image) => ({
        position: 'relative',
        bottom: image !== '' ? '64px' : '6px',
        right: '12px',
        // bottom: '87px',
        // left: '66px',
        height: '21px',
        width: '21px',
        cursor: 'pointer',
        color: hoverIndex === null ? '' : hoverIndex === index ? 'red' : '',
      }),
  };
// console.log('images', images)
  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <div className="image-preview" style={styles.imagePreview}>
        {images.map((image, index) => (
          <div
            key={index}
            className="image-item"
            style={styles.imageItem}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Image width={80} height={75} src={image} alt={`Preview ${index + 1}`} style={styles.image} />
            <RxCrossCircled style={styles.deleteIcon(index, image)} onClick={() => handleImageDelete(index)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImgsWithPreview;
