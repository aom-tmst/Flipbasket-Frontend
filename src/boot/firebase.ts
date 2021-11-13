import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCvwzqyj2UyooMsyxSN1X7zJyRtQSF-NKk',
  authDomain: 'flipbasket-login.firebaseapp.com',
  projectId: 'flipbasket-login',
  storageBucket: 'flipbasket-login.appspot.com',
  messagingSenderId: '251737706500',
  appId: '1:251737706500:web:3d89d63b0f48d2bc692551',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export { auth };
