import { Service } from "typedi";
import { db } from "../../database/firebase-admin"

@Service()
export class StatisticService {
  
    public countAllUser = async () => {
        const snapshot = await db.collection('user').get();
        return snapshot.size;
    }

    public countAllFlight = async () => {
        const snapshot = await db.collection('flight').get();
        return snapshot.size;
    }

    public countAllHotel = async () => {
        const snapshot = await db.collection('hotel').get();
        return snapshot.size;
    }

    public countAllPlace = async () => {
        const snapshot = await db.collection('place').get();
        return snapshot.size;
    }

    public countAllPromo = async () => {
        const snapshot = await db.collection('promo').get();
        return snapshot.size;
    }

    public countAllRoom = async () => {
        const snapshot = await db.collection('room').get();
        return snapshot.size;
    }

    public countAllBooking = async () => {
        const snapshot = await db.collection('booking').get();
        return snapshot.size;
    }

    public countAllBookingFlight = async () => {
        const snapshot = await db.collection('booking_flight').get();
        return snapshot.size;
    }
}