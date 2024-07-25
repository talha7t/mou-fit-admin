import { oldDB } from "@/components/firebase-config";
// import { doc, getDoc, updateDoc,collection, getDocs } from "firebase/firestore";

// @@ method to create/edit multiple docs within a firestore collection
// @@ using specific key value as doc id and key value as data
import {
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  batch,
  runTransaction,
} from "firebase/firestore";

const updateOrCreateDocuments = async (
  db,
  collectionName,
  documentId,
  data
) => {
  try {
    // Get a reference to the document
    const documentRef = doc(db, collectionName, documentId);

    // Check if the document exists
    const docSnapshot = await getDoc(documentRef);

    if (docSnapshot.exists()) {
      // Document exists, update it with the new data
      await updateDoc(documentRef, data);
      console.log("Document updated successfully!");
    } else {
      // Document does not exist, create a new one
      await setDoc(documentRef, data);
      console.log("New document created successfully!");
    }

    // Fetch and return the updated or created document
    const updatedDocSnapshot = await getDoc(documentRef);
    const updatedDocument = updatedDocSnapshot.data();
    console.log("Updated Document:", updatedDocument);

    return updatedDocument;
  } catch (error) {
    console.error("Error updating or creating document:", error);
    return null;
  }
};

export const updateOrCreateDocumentsByKeys = async (
  db,
  collectionName,
  keys,
  data
) => {
  try {
    // Iterate through the array of keys and update or create documents
    const querySnapshot = await getDocs(collection(db, collectionName));

    const removalPromises = querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Document ${doc.id} removed successfully!`);
    });

    const promises = keys.map(async (documentId, index) => {
      let tempArr = [];
      console.log("complete data", index, data);

      // console.log('final data for each obj',index, data[index])
      // data.filter(x => {
      //   let tempStr = x.substring(0,x.indexOf('-'))
      //   if(tempStr){
      //     tempArr.push(x)
      //   }
      //   // return
      // console.log('tempArr',data[index])
      // })
      // if(data[index]?.label === 'slider_section'){
      let newData = data[index];
      if (
        documentId === `${index}-imgs_arr` &&
        data[index]?.label === "slider_section"
      ) {
        // newData.body.imgs_arr = [];
        // console.log('slider_section will be deleted',data[index] )
        // console.log('slider_section will be deleted',data[index].imgs_arr )
      } else {
      }

      return updateOrCreateDocuments(db, collectionName, documentId, newData);
    });
    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    return results;
  } catch (error) {
    console.error("Error updating or creating documents by keys:", error);
    return null;
  }
};

export const getAllDocsWithinCollection = async (
  collectionName,
  documentId
) => {
  try {
    
    const collectionRef = collection(oldDB, collectionName);

    const snapshot = await getDocs(collectionRef);

    const documents = snapshot?.docs?.map((doc) => ({
      // id: doc.id,
      // data: doc.data(),
      ...doc?.data(),
    }));
    console.log("documents:", documents);

    let newArr = documents?.map((x) => {
      if (typeof x.related_parent !== "number") {
        return x;
      }
      // if(!x.id.includes('imgs_arr')){
      // return x
      // }
    });

    return newArr.filter((value) => value !== undefined && value !== null);
  } catch (err) {
    console.error(err);
  }
};

export const getDynmaicSectionsFromOldFirebase = async (
  collectionName,
  documentId
) => {
  try {
    const documentRef = doc(oldDB, collectionName, documentId);

    const updatedDocSnapshot = await getDoc(documentRef);
    const updatedDocument = updatedDocSnapshot.data();
    // console.log('Updated Document:', updatedDocument);
    return updatedDocument;
  } catch (err) {
    console.error(err);
  }
};

export const updateDynmaicSectionsInOldFirebase = async (
  collectionName,
  documentId,
  newSections
) => {
  try {
    let error = "";
    // Get a reference to the document
    const documentRef = doc(oldDB, collectionName, documentId);

    // Get the current document data
    const docSnapshot = await getDoc(documentRef);
    if (!docSnapshot.exists()) {
      console.log("Document does not exist.");
      return null;
    }
    console.log(newSections);

    // Update the dynamic_sections property with the newSections array
    await updateDoc(documentRef, {
      dynamic_sections: newSections,
    }).catch((err) => {
      // alert(err)
      console.error(err);
      // console.log(err + 'Kindly use compressed images')});
      alert("Kindly use compressed images");
    });

    console.log("Document successfully updated!");

    // Fetch and return the updated document
    const updatedDocSnapshot = await getDoc(documentRef);
    const updatedDocument = updatedDocSnapshot.data();
    console.log("Updated Document:", updatedDocument);
    return updatedDocument;
  } catch (error) {
    console.error("Error updating document:", error);
    return null;
  }
};
