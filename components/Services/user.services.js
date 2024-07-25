import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { oldDB } from '../firebase-config';

// const subscriberCollectionRef = collection

const UserCollectionRef = collection(oldDB, "humans");

class UserDataService {
    addUser = (newUser) => {
        return addDoc(UserCollectionRef, newUser);
    };

    updateUser = (id, updatedUser) => {
        const userDoc = doc(oldDB, "humans", id)
        return updateDoc(userDoc, updatedUser);
    };

    deleteUser = (id) => {
        const userDoc = doc(oldDB, "humans", id);
        return deleteDoc(userDoc)
    };

    getAllUsers = () => {
        return getDocs(UserCollectionRef);
    };

    getUser = () => {
        const userDoc = doc(oldDB, "humans", id);
        return getDoc(userDoc);
    };
};

export default UserDataService();