// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged, updateProfile, } from "firebase/auth"
import { getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYq9xcl-76C80ZV_COEd6Kqk3YbOQj_xY",
  authDomain: "fir-auth-5582c.firebaseapp.com",
  projectId: "fir-auth-5582c",
  storageBucket: "fir-auth-5582c.appspot.com",
  messagingSenderId: "914040998218",
  appId: "1:914040998218:web:95e202a47ae11035f1d9b3",
  measurementId: "G-NT66HHYYF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const storage = getStorage()
// custom hook
export function useAuth(){
  const [currentUser, setCurrentUser] = useState();
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub
  },[])
  return currentUser
}
//  storage
export async function  upload(file, currentUser, setLoading){
  const fileRef = ref( storage, currentUser.uid  + '.png' + '.jpg')
  setLoading(true)
   const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)
   updateProfile(currentUser, {photoURL})
   
 
   setLoading(false)
   alert("file is upload")
}


export {auth, app}