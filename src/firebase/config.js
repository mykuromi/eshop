import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  /*
  apiKey: "AIzaSyBPW1J_yoqzzEFj9OzG90GTcwRlLFBiHAY",
  authDomain: "eshop-6c874.firebaseapp.com",
  projectId: "eshop-6c874",
  storageBucket: "eshop-6c874.appspot.com",
  messagingSenderId: "961732417026",
  appId: "1:961732417026:web:01114b528b7f73e2a0f91b",
  */
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
