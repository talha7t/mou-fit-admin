import SectionWithLogoHeaderAndInput from "@/components/Sections/SharedSections/SectionWithLogoHeaderAndInput";
import FlexContainer from "@/components/Widgets/SharedWidgets/Containers/FlexContainer";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import squaresImg from "../../public/images/two-boxes.png";
import Image from "next/image";
import { oldAuth, oldDB } from "@/components/firebase-config";
import { newAuth, newDB } from "@/components/firebase-new-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


const Signup = () => {
  const {
    register,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      signupForm: {
        emailOrUserName: "",
        password: "",
      },
    },
  });

  const useFormPropObj = {
    formName: "signupForm",
    register,
    getValues,
    setValue,
    watch,
  };

  const onSubmit = async (data) => {
    const emailOrUserName = getValues("signupForm.emailOrUserName");
    const password = getValues("signupForm.password");

    let userExistsInOldDB = false;
    let userExistsInNewDB = false;

    if (!emailOrUserName || !password) {
      console.log("Email or username is empty");
      return;
    }

    // Initialize Firestore references
    const oldDBRef = collection(oldDB, "humans");

    const newDBRef = collection(newDB, "Users");

    try {
      // Check old database
      //   const oldUserSnapshot = await oldDBRef.where("email", "==", emailOrUserName).get();
      const oldUserSnapshot = await getDocs(oldDBRef);
      const oldUsers = oldUserSnapshot.docs.map((doc) => doc.data());
      const filteredOldUser = oldUsers.filter(
        (x) => x.email === emailOrUserName
      );

      console.log(filteredOldUser);
      if (filteredOldUser?.length >= 1) {
        userExistsInOldDB = true;
        console.log("User exists in the old database");
        // Handle accordingly
      } else {
        console.log("User doesn't exist in the old database");
        userExistsInOldDB = false;

        // Handle accordingly
      }

      // Check new database
      //   const newUserSnapshot = await newDBRef.where("email", "==", emailOrUserName).get();
      const newUserSnapshot = await getDocs(newDBRef);
      const newUsers = newUserSnapshot.docs.map((doc) => doc.data());
      const filteredNewUser = newUsers.filter(
        (x) => x.email === emailOrUserName
      );

      console.log(filteredNewUser);

      if (filteredNewUser?.length >= 1) {
        console.log("User exists in the new database");
        userExistsInNewDB = true;

        // Handle accordingly
      } else {
        console.log("User doesn't exist in the new database");
        userExistsInNewDB = false;

        // Handle accordingly
      }
    } catch (error) {
      console.error("Error while querying databases:", error);
      // Handle the error
    }
    checkIfUserExists(userExistsInOldDB, userExistsInNewDB);
    
  };
   const checkIfUserExists = async(userExistsInOldDB, userExistsInNewDB) => {
      // @@ FOR LOGIN
    if (userExistsInOldDB && userExistsInNewDB) {
      alert("User exists in both databases");
      // @@ REDIRECT TO LOGIN PAGE !
      
    }else if (userExistsInOldDB && !userExistsInNewDB) {
      // alert("User exists in the old database");

      signInWithEmailAndPassword(
        oldAuth,
        getValues("signupForm.emailOrUserName"),
        getValues("signupForm.password")
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          if (user) {
            // hasCorrectCredentials = true;
            createUserInNewDB(user);
          }
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(err);
          alert("Wrong Password");
          // hasCorrectCredentials = false;
        });
    } else if (!userExistsInOldDB && userExistsInNewDB) {
      alert("User exists in the new database");
      // @@ CHECK CREDENTIALS BY LOGGING INTO NEW DB &&
      // @@ using those credentials to create user in OLD DB
      signInWithEmailAndPassword(
        newAuth,
        getValues("signinForm.emailOrUserName"),
        getValues("signinForm.password")
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          if (user) {
            // hasCorrectCredentials = true;
            createUserInOldDB(userCredential.user.uid);
          }
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(err);
          alert("Wrong Password");
          // hasCorrectCredentials = false;
        });
    } else {
      alert("User doesn't exist in both databases");

      // @@ SEND APPROVAL REQUEST !
      const newDBRef = collection(newDB, "humans_approval");
    try {
      let tempResp = await addDoc(newDBRef,  {
        email: getValues("signupForm.emailOrUserName"),
        password: getValues("signupForm.password"),

      });
      console.log(tempResp);
    } catch (err) {
      console.log(err);
    }
    };
     
    }

    const createUserInNewDB = async (oldUserData) => {
      const newDBRef = collection(newDB, "humans");
      try {
        let tempResp = await addDoc(newDBRef, oldUserData ?? {
          email: getValues("signupForm.emailOrUserName"),
        });
        console.log(tempResp);
      } catch (err) {
        console.log(err);
      }
  
      createUserWithEmailAndPassword(
        newAuth,
        getValues("signupForm.emailOrUserName"),
        getValues("signupForm.password")
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          console.log(userCredential);
  
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(err);
        });
  
      // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const userData = {
        email: getValues("signupForm.emailOrUserName"),
  
        // created_at: timestamp,
        // updated_at: timestamp,
      };
  
    };
    const createUserInOldDB = async (oldUserData) => {
  
      const oldDBRef = collection(oldDB, "humans");
      try {
        let tempResp = await addDoc(
          oldDBRef,
          oldUserData ?? {
            email: getValues("signupForm.emailOrUserName"),
          }
        );
        console.log(tempResp);
      } catch (err) {
        console.log(err);
      }
  
      createUserWithEmailAndPassword(
        oldAuth,
        getValues("signupForm.emailOrUserName"),
        getValues("signupForm.password")
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          console.log(userCredential);
  
          // ...
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(err);
        });
  
      // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const userData = {
        email: getValues("signupForm.emailOrUserName"),
  
        // created_at: timestamp,
        // updated_at: timestamp,
      };
    };
  useEffect(() => {
    console.log(watch());
  }, [watch]);

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <FlexContainer grid={10.5}>
        <SectionWithLogoHeaderAndInput
          dataObj={{
            title: "Signup",
            buttonText: "Sign in",
            linkText: "Forgot Password",
            onClick: () => {
              onSubmit();
            },
            dynamicFields: [
              {
                target: `emailOrUserName`,
                label: "Email",
                placeholder: "Enter Email",
                fieldType: "email",
              },
              {
                target: `password`,
                label: "Password",
                placeholder: "Enter Password",
                fieldType: "password",
              },
            ],
          }}
          useFormPropObj={useFormPropObj}
        />
      </FlexContainer>

      <FlexContainer grid={12} styles={{ justifyContent: "end" }}>
        <Image src={squaresImg} alt={"alt"} width="421px" height="123px" />
      </FlexContainer>
    </form>
  );
};

export default Signup;
