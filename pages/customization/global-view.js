import { getDynmaicSectionsFromOldFirebase } from "@/components/Helpers/ApiCalls/firebaseApiCalls";
import GlobalCustomizationview from "@/components/View/GlobalCustomizationView";
// import GlobalCustomizationview from "@/components/View/GlobalCustomizationview";

import { oldDB } from "@/components/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const GlobalView = () => {
  const [dynamicSectionsArr, setDynamicSectionsArr] = useState({
    header_section: {
      logo: "",
      header_menu: [
        { title: "Home", link: "/" },
        { title: "Locations", link: "/locations" },
        { title: "Contact us", link: "/contact-us" },
        { title: "About us", link: "/about-us" },
        { title: "How it works", link: "/how-it-works" },
      ],
    },
  });

  const {
    register,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      globalSectionsForm: {
        headSection: {
          nav_logo: '/images/placeholder-image',
          nav_data: []
        },
        footerSection: {
          menus: {
            first_col_menu: [],
            second_col_menu: [],
            third_col_menu: [],
          }
        },
        dynamicSectionsArr: {},
      },
    },
  });
  const useFormPropObj = {
    formName: "globalSectionsForm",
    register,
    getValues,
    setValue,
    watch,
  };

  let padding = "4em 0 0 ";

  const updateHeaderSection = async() => {
    try {
      const documentRef = doc(oldDB, 'global_customization', 'nav_section');

   // Get the current document data
   const docSnapshot = await getDoc(documentRef);
   if (!docSnapshot.exists()) {
     console.log('Document does not exist.');
     return null;
   }
   // console.log(newSections);

   // Update the dynamic_sections property with the newSections array
   await updateDoc(documentRef, {
     nav_data: getValues('globalSectionsForm.headSection.nav_data'),
     nav_logo: getValues('globalSectionsForm.headSection.nav_logo'),

   })
   } catch (err) {
     console.log(err)
   }
  
  }

  const updateFooterSection = async() => {
    try {
      const documentRef = doc(oldDB, 'global_customization', 'new_footer_section');

   // Get the current document data
   const docSnapshot = await getDoc(documentRef);
   if (!docSnapshot.exists()) {
     console.log('Document does not exist.');
     return null;
   }
   // console.log(newSections);

   // Update the dynamic_sections property with the newSections array
   await updateDoc(documentRef, {
    menus: {
      first_col_menu: getValues('globalSectionsForm.footerSection.menus.first_col_menu'),
      second_col_menu: getValues('globalSectionsForm.footerSection.menus.second_col_menu'),
      third_col_menu: getValues('globalSectionsForm.footerSection.menus.third_col_menu'),
    }
   })
   } catch (err) {
     console.log(err)
   }
  
  }
  const onSubmit = async (data) => {
    // console.log(data);
    console.log(watch());

    updateHeaderSection();
    updateFooterSection();
  };

  useEffect(() => {
    console.log(watch());
    const fetchHeaderSection = async () => {
      // console.log(await getDynmaicSection('test_collection', 'home_test_page'))
      return await getDynmaicSectionsFromOldFirebase(
        "global_customization",
        "nav_section"
      );
    };
    const fetchFooterSection = async () => {
      // console.log(await getDynmaicSection('test_collection', 'home_test_page'))
      return await getDynmaicSectionsFromOldFirebase(
        "global_customization",
        "new_footer_section"
      );
    };
    fetchHeaderSection()
      .then((data) => {
        let resp = data;
        // console.log(resp);
        setDynamicSectionsArr(resp);
        setValue("globalSectionsForm.headSection", resp);
      })
      .catch((err) => console.error(err));
      fetchFooterSection()
      .then((data) => {
        let resp = data;
        console.log(resp);
        // setDynamicSectionsArr(resp);
        setValue("globalSectionsForm.footerSection", resp);
      })
      .catch((err) => console.error(err));
  }, [watch]);

  useEffect(() => {}, [dynamicSectionsArr]);

  return (
    <>
      <GlobalCustomizationview
        dataObj={getValues("globalSectionsForm") }
        useFormPropObj={useFormPropObj}
        methodsObj={{
          onSubmit,
          setDynamicSectionsArr,
          handleSubmit,
        }}
      />
    </>
  );
};

export default GlobalView;
