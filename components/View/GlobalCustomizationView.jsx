import { Grid } from "@mui/material";
import React from "react";
import TitleAndBtnRow from "../Sections/SharedSections/TitleAndBtnRow";
import ChipContainer from "../Widgets/SharedWidgets/Containers/ChipContainer";

import HeaderCustomizationSection from "../Sections/SingleUseSections/GlobalCustomizationSections/HeaderCustomizationSection";
import DynamicTitle from "../Widgets/SharedWidgets/Text/DynamicTitle";
import FooterCustomizationSection from "../Sections/SingleUseSections/GlobalCustomizationSections/FooterCustomizationSection";

const GlobalCustomizationview = ({ methodsObj, useFormPropObj, dataObj }) => {

  const { onSubmit, handleSubmit, setDynamicSectionsArr } = methodsObj;
  const { formName, setValue, getValues } = useFormPropObj;

  let padding = "4em 2em 0 ";

  // console.log(dataObj)
  // console.log(useFormPropObj.watch())
  return (
    <>
      <Grid
        container
        sx={{
          padding: {
            xs: `${padding} 1em`,
            sm: `${padding} 2em`,
            md: `${padding} 2em`,
            lg: `${padding} 2em`,
            xl: `${padding} 2em`,
          },
        }}
        spacing={1}
      >
        <form
          style={{ width: "97%", marginRight: "1em" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <ChipContainer
            styles={{
              padding: "1em 1.3em 0 1.3em",
              margin: "0 0em 1em 1em",
            }}
          >
            {/* Title && BUTTON ROW */}
            <TitleAndBtnRow
              data={{
                onClick: onSubmit,
                text: "Global Sections Customization",
              }}
              useFormPropObj={useFormPropObj}
              styles={{ margin: "0 0  1em 0" }}
            />
          </ChipContainer>

          <ChipContainer
            styles={{
              padding: "1em 1.3em 0 1.3em",
              margin: "0 0em 1em 1em",
            }}
          >
            <Grid item xs={12} styles={{ justifyContent: "start" }}>
              <DynamicTitle
                text={"Header Section" }
                styles={{ padding: "0 0 0.3em 0" }}
              />
            </Grid>
            <HeaderCustomizationSection
              dataObj={getValues(`${formName}`)}
              useFormPropObj={useFormPropObj}
            />
          </ChipContainer>

          <ChipContainer
            styles={{
              padding: "1em 1.3em 0 1.3em",
              margin: "0 0em 1em 1em",
            }}
          >
            <Grid item xs={12} styles={{ justifyContent: "start" }}>
              <DynamicTitle
                text={"Footer Section" }
                styles={{ padding: "0 0 0.3em 0" }}
              />
            </Grid>
            <FooterCustomizationSection
              dataObj={getValues(`${formName}`)}
              useFormPropObj={useFormPropObj}
            />
          </ChipContainer>
        </form>
      </Grid>
    </>
  );
};

export default GlobalCustomizationview;
