import { initializeApp, cert} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { ServiceAccount, firestore } from "firebase-admin";
import serviceAccountJson from "../../travoapps-b31c4-firebase-adminsdk-bexhu-1d7d257ed4.json";
import dayjs from "dayjs";



initializeApp({
    credential: cert(serviceAccountJson as ServiceAccount),
    databaseURL: process.env.FIREBASE_URL,
});

export const convertToTimestamp = (date: string) => {
    const dateDayjs = dayjs(date).format("HH:mm:ss D/M/YYYY");
    const dateTime = dayjs(dateDayjs).toDate();

    return firestore.Timestamp.fromDate(dateTime);
};

export const db = getFirestore();
export const auth = getAuth();