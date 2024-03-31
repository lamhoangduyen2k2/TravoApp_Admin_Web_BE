import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-GckfL8YglCMJoShTiw0RndB4xxnisgQ",
  authDomain: "travoapps-b31c4.firebaseapp.com",
  projectId: "travoapps-b31c4",
  storageBucket: "travoapps-b31c4.appspot.com",
  messagingSenderId: "957890556594",
  appId: "1:957890556594:web:e22e4555af2e48500a0fab",
  measurementId: "G-EBQB2JXGQP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
