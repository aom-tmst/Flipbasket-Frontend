import * as firebaseAuth from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { ExecException } from 'child_process';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
  apiKey: 'AIzaSyCvwzqyj2UyooMsyxSN1X7zJyRtQSF-NKk',
  authDomain: 'flipbasket-login.firebaseapp.com',
  projectId: 'flipbasket-login',
  storageBucket: 'flipbasket-login.appspot.com',
  messagingSenderId: '251737706500',
  appId: '1:251737706500:web:3d89d63b0f48d2bc692551',
};

const firebase = initializeApp(firebaseConfig);
const auth = firebaseAuth.getAuth(firebase)

const storage = getStorage(firebase);

const UploadImage = async (file:File):Promise<string> => {
  const storageRef = ref(storage, Date.now().toString());
  await uploadBytes(storageRef,file)
 const imageUrl =  await getDownloadURL(storageRef)

  return  imageUrl
}
// --------------------------- Google ----------------------------
const LoginWithGoogle = async() => {
  try {
    const googleProvider = new firebaseAuth.GoogleAuthProvider();
    return await firebaseAuth.signInWithPopup(auth , googleProvider)
  }
  catch (error) {
    throw new Error((error as ExecException).message)
  }
};

//----------------------------- facebook ------------------------
const LoginWithFacebook = async() => {
  try {
    const facebookProvider = new firebaseAuth.FacebookAuthProvider();
    return await firebaseAuth.signInWithPopup(auth , facebookProvider)
  } catch (error) {
    throw new Error((error as ExecException).message)
  }
};

//----------------------------- login with firebase ------------------------

const LoginWithFirebase = async(email:string,password:string) => {
  try {
    const provider = await firebaseAuth.signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return provider
  } catch (error) {
    throw new Error((error as ExecException).message)
  }
}

//----------------------------- Regist with firebase ------------------------

const RegistWithFirebase = async(name:string,email:string,password:string) => {
  try {
    const provider = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const displayName =  await firebaseAuth.updateProfile( provider.user , {
      displayName: name
    })
    return provider
  } catch (error) {
    throw new Error((error as ExecException).message)
  }
}

//----------------------------- Forgot Password ------------------------

const ForgotPassword = async(email:string) => {
  try {
    const resetProvider = await firebaseAuth.sendPasswordResetEmail(
      auth,
      email
    )
    return resetProvider
  } catch (error) {
    throw new Error((error as ExecException).message)
  }
}

export { auth,LoginWithGoogle,LoginWithFacebook,LoginWithFirebase,RegistWithFirebase,ForgotPassword,UploadImage } 