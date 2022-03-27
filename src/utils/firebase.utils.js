import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8S_4TGQBoqvKQ_y_lrt-puCeJONY-Zi8",
  authDomain: "crwn-clothing-db-7c713.firebaseapp.com",
  projectId: "crwn-clothing-db-7c713",
  storageBucket: "crwn-clothing-db-7c713.appspot.com",
  messagingSenderId: "256389583154",
  appId: "1:256389583154:web:0da0e0a51cb25c3498472b",
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);

const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalFields
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalFields,
      });
    } catch (error) {
      console.log("failed to create user", error);
    }
  }

  return userDocRef;
};

export const createUserAuthWithUserEmailAndPassword = (email, password) => {
  if (!email || !password) {
    return;
  }

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = (email, password) => {
  if (!email || !password) {
    return;
  }

  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);
