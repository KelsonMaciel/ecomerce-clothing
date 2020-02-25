import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

debugger;

let env = { ...process.env };

const config = {
    apiKey: process.env.REACT_APP_API_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_API_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_API_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_API_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_API_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_API_FIREBASE_MESSAGINSENDERID,
    appId: process.env.REACT_APP_API_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_API_FIREBASE_MEASUREMENTID
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot  = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
