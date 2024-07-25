import React from "react";
import { Grid } from "@mui/material";
import CustomAccordionWithTwoInputs from "@/components/Widgets/SharedWidgets/Accordion/CustomAccordionWithTwoInputs";
import DynamicTitle from "@/components/Widgets/SharedWidgets/Text/DynamicTitle";
import ButtonComp from "@/components/Widgets/SharedWidgets/Buttons/ButtonComp";

const FooterCustomizationSection = ({ useFormPropObj }) => {
  const { getValues, formName, setValue } = useFormPropObj;
  return (
    <Grid container xs={12} className="head__wrapper">
      <Grid item xs={12} styles={{ justifyContent: "start" }}>
        <DynamicTitle
          text={"Quick Links"}
          styles={{ padding: "0 0 0.3em 0" }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomAccordionWithTwoInputs
          useFormPropObj={useFormPropObj}
          target={"footerSection.menus.first_col_menu"}
        />
      </Grid>
      <ButtonComp
        data={{
          title: "Add An Item",
          onClick: () => {
            let tempArr = getValues(
              `${formName}.footerSection.menus.first_col_menu`
            );
            let newObj = { link: "/", label: "" };
            tempArr.push(newObj);
            setValue(`${formName}.footerSection.menus.first_col_menu`, tempArr);
          },
        }}
        styles={{
          margin: "1em ",
          padding: "0.5em 2em",
          hvrPadding: "0.6em 2em",
        }}
      />
      <Grid item xs={12} styles={{ justifyContent: "start" }}>
        <DynamicTitle
          text={"Information"}
          styles={{ padding: "0 0 0.3em 0" }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomAccordionWithTwoInputs
          useFormPropObj={useFormPropObj}
          target={"footerSection.menus.second_col_menu"}
        />
      </Grid>
      <ButtonComp
        data={{
          title: "Add An Item",
          onClick: () => {
            let tempArr = getValues(
              `${formName}.footerSection.menus.second_col_menu`
            );
            let newObj = { link: "/", label: "" };
            tempArr.push(newObj);
            setValue(`${formName}.footerSection.menus.first_col_menu`, tempArr);
          },
        }}
        styles={{
          margin: "1em ",
          padding: "0.5em 2em",
          hvrPadding: "0.6em 2em",
        }}
      />
      <Grid item xs={12} styles={{ justifyContent: "start" }}>
        <DynamicTitle
          text={"About Us"}
          styles={{ padding: "0 0 0.3em 0" }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomAccordionWithTwoInputs
          isDesc={true}
          useFormPropObj={useFormPropObj}
          target={"footerSection.menus.third_col_menu"}
        />
      </Grid>
      <ButtonComp
        data={{
          title: "Add An Item",
          onClick: () => {
            let tempArr = getValues(
              `${formName}.footerSection.menus.third_col_menu`
            );
            let newObj = { desc: "", label: "" };
            tempArr.push(newObj);
            setValue(`${formName}.footerSection.menus.first_col_menu`, tempArr);
          },
        }}
        styles={{
          margin: "1em ",
          padding: "0.5em 2em",
          hvrPadding: "0.6em 2em",
        }}
      />
    </Grid>
  );
};

export default FooterCustomizationSection;
