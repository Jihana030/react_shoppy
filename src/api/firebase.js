import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

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
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
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

async function adminUser(user){
    return get(ref(database, 'admins')).then((snapshot)=> {
        if(snapshot.exists()){
            const admins = snapshot.val();
            console.log(admins); //단계별로 오류를 체크하기 위해서
            const isAdmin = admins.includes(user.uid);
            return {...user, isAdmin};
        }
        return user;
    }) 
}