import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGYUWfAEDTSLrRqDAKIu5rOpxyNtnBRbA",
  authDomain: "nfc-project-d1344.firebaseapp.com",
  databaseURL: "https://nfc-project-d1344-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nfc-project-d1344",
  storageBucket: "nfc-project-d1344.appspot.com",
  messagingSenderId: "805829889154",
  appId: "1:805829889154:web:31a1a79cf1c4dcebc8389b",
  measurementId: "G-7XLN4JXLPE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, analytics, auth, storage, db };
