import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD8S_4TGQBoqvKQ_y_lrt-puCeJONY-Zi8',
  authDomain: 'crwn-clothing-db-7c713.firebaseapp.com',
  projectId: 'crwn-clothing-db-7c713',
  storageBucket: 'crwn-clothing-db-7c713.appspot.com',
  messagingSenderId: '256389583154',
  appId: '1:256389583154:web:0da0e0a51cb25c3498472b',
}

initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopUp = () => signInWithPopup(auth, provider)

const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log('failed to create user', error)
    }
  }

  return userDocRef
}
