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
  setDoc,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Signin = () => {
  const {
    register,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      signinForm: {
        emailOrUserName: "",
        password: "",
      },
    },
  });

  const useFormPropObj = {
    formName: "signinForm",
    register,
    getValues,
    setValue,
    watch,
  };

  /**
   * This code snippet defines two functions: `createUserInNewDB` and `createUserInOldDB`.
   *
   * The `createUserInNewDB` function creates a new user in the new database by adding a document to the "humans" collection and signing in the user using the provided email and password. It also logs the user and userCredential objects to the console.
   *
   * The `createUserInOldDB` function creates a new user in the old database by adding a document to the "humans" collection and signing in the user using the provided email and password. It also logs the user and userCredential objects to the console.
   *
   * The code snippet also defines an `onSubmit` function that is called when a form is submitted. It checks if the email or username input is empty and returns if it is. It then queries the old and new databases to check if the user exists based on the provided email or username. The results are passed to the `checkIfUserExists` function.
   *
   * The `checkIfUserExists` function checks if the user exists in both databases, in the old database only, in the new database only, or in neither database. Based on the results, it performs different actions such as signing in the user, creating the user in the other database, or sending a user approval request.
   */

  const createUserInNewDB = async (oldUserData) => {
    const newDBRef = collection(newDB, "humans");
    try {
      let tempResp = await addDoc(newDBRef, oldUserData ?? {
        email: getValues("signinForm.emailOrUserName"),
      });
      console.log(tempResp);
    } catch (err) {
      console.log(err);
    }

    createUserWithEmailAndPassword(
      newAuth,
      getValues("signinForm.emailOrUserName"),
      getValues("signinForm.password")
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
      email: getValues("signinForm.emailOrUserName"),

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
          email: getValues("signinForm.emailOrUserName"),
        }
      );
      console.log(tempResp);
    } catch (err) {
      console.log(err);
    }

    createUserWithEmailAndPassword(
      oldAuth,
      getValues("signinForm.emailOrUserName"),
      getValues("signinForm.password")
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
      email: getValues("signinForm.emailOrUserName"),

      // created_at: timestamp,
      // updated_at: timestamp,
    };
  };

  const onSubmit = async (data) => {
    const emailOrUserName = getValues("signinForm.emailOrUserName");
    let userExistsInOldDB = false;
    let userExistsInNewDB = false;

    if (!emailOrUserName) {
      console.log("Email or username is empty");
      return;
    }

    // @@ CREATE DYNAMIC FUNC HERE
    // Initialize Firestore references
    const oldDBRef = collection(oldDB, "humans");

    const newDBRef = collection(newDB, "humans");

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
      } else {
        console.log("User doesn't exist in the old database");
        userExistsInOldDB = false;
      }

      // @@ CREATE DYNAMIC FUNC HERE ---- TILL HERE

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
      } else {
        console.log("User doesn't exist in the new database");
        userExistsInNewDB = false;
      }
    } catch (error) {
      console.error("Error while querying databases:", error);
      // Handle the error
    }
    checkIfUserExists(userExistsInOldDB, userExistsInNewDB);
  };

  const checkIfUserExists = (userExistsInOldDB, userExistsInNewDB) => {
    // @@ FOR LOGIN
    if (userExistsInOldDB && userExistsInNewDB) {
      alert("User exists in both databases");
      signInWithEmailAndPassword(
        newAuth,
        getValues("signinForm.emailOrUserName"),
        getValues("signinForm.password")
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          console.log("userCredential", userCredential);
          if (user) {
            // hasCorrectCredentials = true;
            // createUserInOldDB();
            // @@ REDIRECT TO DASHBOARD !
          }
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(err);
          alert("Wrong Password");
          // hasCorrectCredentials = false;
        });
    } else if (userExistsInOldDB && !userExistsInNewDB) {
      // alert("User exists in the old database");

      signInWithEmailAndPassword(
        oldAuth,
        getValues("signinForm.emailOrUserName"),
        getValues("signinForm.password")
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
            createUserInOldDB(user);
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
      // @@ SEND USER APPROVAL REQUEST WITH CREDENTIALS !!
    }
  };

  useEffect(() => {
    console.log(watch());
  }, [watch]);

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <FlexContainer grid={10.5}>
        <SectionWithLogoHeaderAndInput
          dataObj={{
            title: "Signin",
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

export default Signin;
