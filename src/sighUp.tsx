// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDekqql6fGo6LJvvl8dPtgrZ-4JcQsSJaY",
    authDomain: "nika-56d37.firebaseapp.com",
    projectId: "nika-56d37",
    storageBucket: "nika-56d37.firebasestorage.app",
    messagingSenderId: "71941060599",
    appId: "1:71941060599:web:cbceb9a88186a5a23d20f2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };



