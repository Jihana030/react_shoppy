import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export function login(){
    signInWithPopup(auth, provider)
        /*
        .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        return user;
      })
      */
      .catch(console.error);
    //     (error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     const email = error.customData.email;
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //   }
    // error 화살표함수로 받는 값도 error면 (console.error)라고 쓸 수 있다.
}
export function logout(){
    signOut(auth).catch(console.error); 
}

export function onUserStateChange(callback){
    onAuthStateChanged(auth, (user) => {
        callback(user);
        /*
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }*/
      });
}