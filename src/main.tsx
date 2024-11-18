import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDekqql6fGo6LJvvl8dPtgrZ-4JcQsSJaY",
  authDomain: "nika-56d37.firebaseapp.com",
  projectId: "nika-56d37",
  storageBucket: "nika-56d37.firebasestorage.app",
  messagingSenderId: "71941060599",
  appId: "1:71941060599:web:cbceb9a88186a5a23d20f2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

// Function to create a shared document
async function createSharedDocument(user1UID: string, user2UID: string, sharedData: any) {
  const docId = [user1UID, user2UID].sort().join('_'); // Unique ID based on UIDs
  const docRef = doc(db, 'sharedData', docId);

  await setDoc(docRef, {
    allowedUsers: [user1UID, user2UID],
    ...sharedData, // Add any additional data you want to save
  });
}

// Function to retrieve shared data
async function getSharedData(user1UID: string, user2UID: string) {
  const docId = [user1UID, user2UID].sort().join('_');
  const docRef = doc(db, 'sharedData', docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data(); // Return the shared data
  } else {
    console.log("No shared data found for these users.");
    return null;
  }
}

// Function to upload a file to Firebase Storage and return its download URL
async function uploadFile(file: File, userUID: string) {
  const storageRef = ref(storage, `uploads/${userUID}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL; // Return the file's download URL
}

// Function to share files between users
export async function shareFileBetweenUsers(user1UID: string, user2UID: string, file: File) {
  // Upload the file and get its download URL
  const fileURL = await uploadFile(file, user1UID);

  // Create shared document with the file URL
  await createSharedDocument(user1UID, user2UID, { fileURL });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);