import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  enableMultiTabIndexedDbPersistence, 
  collection, 
  collectionGroup,
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where, 
  getDocs,
  runTransaction,
  increment,
  orderBy
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZ9ADuZD6XKXiK-bcldyecFux_hRLGlBo",
  authDomain: "seivus-dfcba.firebaseapp.com",
  projectId: "seivus-dfcba",
  storageBucket: "seivus-dfcba.firebasestorage.app",
  messagingSenderId: "118631234819",
  appId: "1:118631234819:web:bb64b4ddfbec62dd86fd36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Enable offline persistence
enableMultiTabIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a a time.
    console.warn("Firebase persistence failed-precondition.");
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the features required to enable persistence
    console.warn("Firebase persistence unimplemented.");
  }
});

// Initialize Auth
const auth = getAuth(app);

export { db, auth };
