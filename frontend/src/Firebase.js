// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider, signInWi } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd4HpM_xjttrNKEPXt7llqaYLnDLmg4Ro",
  authDomain: "tunein-408623.firebaseapp.com",
  projectId: "tunein-408623",
  storageBucket: "tunein-408623.appspot.com",
  messagingSenderId: "512362543483",
  appId: "1:512362543483:web:f1bbdfc90c4763bca5e5de",
  measurementId: "G-0EL8P93DCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

// const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       return result
//       // const name = result.user.displayName;
//       // const email = result.user.email;
//       // const profilePic = result.user.photoURL;

//       // localStorage.setItem("name", name);
//       // localStorage.setItem("email", email);
//       // localStorage.setItem("profilePic", profilePic);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// export const signOut = () => {
//   signOut()
//     .then(console.log(`User signed out`));
// }