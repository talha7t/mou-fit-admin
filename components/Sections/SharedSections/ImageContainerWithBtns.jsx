import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import Image from "next/image";
import FlexContainer from "@/components/Widgets/SharedWidgets/Containers/FlexContainer";

const ImageContainerWithBtns = ({
  defaultImg,
  imageSrc,
  placeholderSrc,
  onImageChange,
  onImageRemove,
  imgStyles,
  index,
  target,
  useFormPropObj,
}) => {
  // console.log('imageSrc',imageSrc)
  const [currentSrc, setCurrentSrc] = useState(
    defaultImg || imageSrc || placeholderSrc
  );

  const handleImageChange = async (event, target) => {
    if (event) {
      try {
        const file = event?.target?.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader?.result;

          // Set the optimized image URL
          const optimizedImageUrl = optimizeImageUrl(imageData);

          // Set the image source using the optimized URL
          setCurrentSrc(optimizedImageUrl);

          if (onImageChange) {
            onImageChange(optimizedImageUrl);
          }

          if (target) {
            useFormPropObj?.setValue(`${target}`, optimizedImageUrl);
          }
        };
        if (file) {
          reader?.readAsDataURL(file);
        }
      } catch (err) {
        console.error(err);
      }
    }
    console.log('target',`${target}`)
  };

  // Helper function to optimize the image URL
  const optimizeImageUrl = (imageUrl) => {
    // Assuming the "next-optimized-images" package is correctly configured in "next.config.js",
    // you can simply return the original image URL
    // and let Next.js handle the optimization during build time.
    return imageUrl;
  };

  const handleImageRemove = () => {
    setCurrentSrc(
      placeholderSrc ?? "https://via.placeholder.com/300x200?text=No+Image"
    );
    if (onImageRemove) {
      onImageRemove();
    }

    if (target) {
      useFormPropObj?.setValue(
        `${target}`,
        "https://via.placeholder.com/300x200?text=No+Image"
      );
      // setCurrentSrc('')
    }
  };

  const styles = {
    container: {
      height: imgStyles?.height ?? "40%",
      width: imgStyles?.width ?? "30%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
      border: "1px solid #171821",
      margin: imgStyles?.margin,
    },
    image: {
      width: "100%",
      height: "auto",
      maxHeight: "150px",
      borderRadius: "5px 5px 0 0",
      border: "1px solid white",

      // marginBottom: '10px'
    },
    buttonLeft: {
      borderRadius: "0px 0 0 5px",
      // fontSize: '0.8em',
      width: "100%",
      display: "flex",
      justifyContent: "center",
      color: `${imgStyles?.btnColor ?? "white"}`,
      border: "1px solid white",
      fontSize: "10px",
    },
    buttonRight: {
      borderRadius: "0 0px 5px 0",
      fontSize: "0.8em",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      color: `${imgStyles?.btnColor ?? "white"}`,
      border: "1px solid white",
      fontSize: "10px",
    },
  };
  // useEffect(() => {
  //   setCurrentSrc(imageSrc)
  //   console.log(currentSrc)
  // console.log('imageSrc',imageSrc)
  // }, [imageSrc])
  // console.log(target)
  // console.log(useFormPropObj.getValues(`${target}`))
  return (
    <div style={styles.container}>
      <Image
        src={imageSrc ?? "https://via.placeholder.com/300x200?text=No+Image"}
        alt="Preview"
        // objectFit="cover" // DEPRECIATED
        // fill // DEPRECIATED
        width={20}
        height={120}
        style={styles.image}
      />

      <Grid item xs={12} sx={{ width: "100%" }}>
        <FlexContainer grid={12} style={{ width: "100%" }}>
          <Grid item xs={6} sx={{ p: 0 }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={styles.buttonLeft}
            >
              Change
              <input
                type="file"
                hidden
                onChange={(e) => {
                  target ? handleImageChange(e, target) : handleImageChange(e);
                }}
                accept="image/*"
              />
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ p: 0 }}>
            <Button
              variant="outlined"
              fullWidth
              sx={styles.buttonRight}
              onClick={() =>
                target ? handleImageRemove(target) : handleImageRemove
              }
            >
              Remove
            </Button>
          </Grid>
        </FlexContainer>
      </Grid>
    </div>
  );
};

export default ImageContainerWithBtns;
