import { initializeApp, cert} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { ServiceAccount } from "firebase-admin";
import serviceAccountJson from "../../travoapps-b31c4-firebase-adminsdk-bexhu-1d7d257ed4.json";



initializeApp({
    credential: cert(serviceAccountJson as ServiceAccount),
    databaseURL: process.env.FIREBASE_URL,
});

export const db = getFirestore();
export const auth = getAuth();