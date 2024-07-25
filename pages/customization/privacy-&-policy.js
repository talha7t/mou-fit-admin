import { getDynmaicSectionsFromOldFirebase } from "@/components/Helpers/ApiCalls/firebaseApiCalls";
import TitleAndBtnRow from "@/components/Sections/SharedSections/TitleAndBtnRow";
import ChipContainer from "@/components/Widgets/SharedWidgets/Containers/ChipContainer";
import DynamicTitle from "@/components/Widgets/SharedWidgets/Text/DynamicTitle";
import RichTextAreaEditor from "@/components/Widgets/SharedWidgets/TextArea/RichTextAreaEditor";
import { oldDB } from "@/components/firebase-config";
import { Grid } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const PrivacyAndPolicy = () => {
  const {
    register,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      privacyForm: {
        privacySection: "",
        policySection: "",
        dynamicSectionsArr: [],
      },
    },
  });
  const useFormPropObj = {
    formName: "privacyForm",
    register,
    getValues,
    setValue,
    watch,
  };

  let padding = "4em 0 0 ";

  const updatePolicySection = async() => {
    try {
      const documentRef = doc(oldDB, 'global_customization', 'privacy_and_policy');

   // Get the current document data
   const docSnapshot = await getDoc(documentRef);
   if (!docSnapshot.exists()) {
     console.log('Document does not exist.');
     return null;
   }
   // console.log(newSections);

   // Update the dynamic_sections property with the newSections array
   await updateDoc(documentRef, {
     policy_section: getValues('privacyForm.policySection'),
     privacy_section: getValues('privacyForm.privacySection'),

   })
   } catch (err) {
     console.log(err)
   }
  
  }

  const onSubmit = async (data) => {
    console.log(watch());
    updatePolicySection();
    
  };
  const [dynamicSectionsArr, setDynamicSectionsArr] = useState([]);
  useEffect(() => {
    console.log(watch());
    const fetchPolicySection = async () => {
        // console.log(await getDynmaicSection('test_collection', 'home_test_page'))
        return await getDynmaicSectionsFromOldFirebase(
          "global_customization",
          "privacy_and_policy"
        );
      };

      fetchPolicySection()
      .then((data) => {
        let resp = data;
        console.log(resp);
        // setDynamicSectionsArr(resp);
        setValue("privacyForm.privacySection", resp.privacy_section);
        setValue("privacyForm.policySection", resp.policy_section);
        console.log(resp)

      })
      .catch((err) => console.error(err));
  }, [watch]);
  return (
    <Grid
      container
      sx={{
        padding: {
          sm: `${padding} 6em`,
          md: `${padding} 5em`,
          lg: `${padding} 1.2em`,
          xl: `${padding} 0em`,
        },
      }}
      spacing={1}
    >
      <form style={{ width: "97%" }} onSubmit={handleSubmit(onSubmit)}>
        <ChipContainer
          styles={{
            padding: "1em 1.3em",
            margin: "0 0 0 1em",
          }}
        >
          {/* TITLE AND BTN ROW */}
          {/* <TitleAndBtnRow data={{ onClick: onSubmit, text: 'Locations Page Customization', dynamicSectionsArr, setDynamicSectionsArr, availableSections: locationsPageAvailableSections }} useFormPropObj={useFormPropObj} styles={{ margin: '0 0  1em 0' }} /> */}
          <TitleAndBtnRow
            data={{
              onClick: onSubmit,
              text: "Privacy & Policy Customization",
            }}
            useFormPropObj={useFormPropObj}
            styles={{ margin: "0 0  1em 0" }}
          />

          <Grid item xs={12}>
            <Grid item xs={12} styles={{ justifyContent: "start" }}>
              <DynamicTitle
                text={"Privacy Section"}
                styles={{ padding: "0 0 0.3em 0" }}
              />
            </Grid>
            <RichTextAreaEditor
              styles={{ margin: "1em 0", width: "97%" }}
              dataObj={{ target: "privacySection" }}
              useFormPropObj={useFormPropObj}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} styles={{ justifyContent: "start" }}>
              <DynamicTitle
                text={"Policies Section"}
                styles={{ padding: "1em 0 0.3em 0" }}
              />
            </Grid>
            <RichTextAreaEditor
              styles={{ margin: "1em 0", width: "97%" }}
              dataObj={{ target: "policySection" }}
              useFormPropObj={useFormPropObj}
            />
          </Grid>
        </ChipContainer>
      </form>
    </Grid>
  );
};

export default PrivacyAndPolicy;
