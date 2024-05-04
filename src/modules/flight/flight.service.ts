import { Service } from "typedi";
import { convertToTimestamp, db } from "../../database/firebase-admin"
import { CreateFlightDTO } from "./dto/create-flight.dto";
import { UpdateFlightDTO } from "./dto/update-flight.dto";

@Service()
export class FlightService {
    public seat = []
    constructor() {
        this.seat = [
            {
                1: [true, true, true, true],
                2: [true, true, true, true],
                3: [true, true, true, true]
            }, 
            {
                1: [true, true, true, true, true, true],
                2: [true, true, true, true, true, true],
                3: [true, true, true, true, true, true],
                4: [true, true, true, true, true, true],
                5: [true, true, true, true, true, true],
            }
        ]
    }

    public getFlightById = async (flightId: string) => {
        const flight = await db.collection('flight').doc(flightId).get()
        if (!flight.exists) throw new Error('Flight not found!')

        return {id : flight.id, ...flight.data(), arrive_time: flight.data().arrive_time.toDate(), departure_time: flight.data().departure_time.toDate()} 
    }

    public createFlight = async (flightInfo: CreateFlightDTO) => {
        const flight = {
            ...flightInfo,
            seat: this.seat,
            arrive_time: convertToTimestamp(flightInfo.arrive_time),
            departure_time: convertToTimestamp(flightInfo.departure_time)
        }

        const newFlight = await db.collection('flight').add(flight)
        if (!newFlight) throw new Error('Failed to create flight!')

        return flight
    }

    public updateFlight = async (flightInfo: UpdateFlightDTO) => {
        const oldFlight = await db.collection('flight').doc(flightInfo.id).get()
        if (!oldFlight.exists) throw new Error('Flight not found!')
        
        const updateFlight = {
            airline: flightInfo.airline || oldFlight.data().airline,
            arrive_time: flightInfo.arrive_time ? convertToTimestamp(flightInfo.arrive_time) : oldFlight.data().arrive_time,
            departure_time: flightInfo.departure_time ? convertToTimestamp(flightInfo.departure_time) : oldFlight.data().departure_time,
            facilities: flightInfo.facilities || oldFlight.data().facilities,
            from_place: flightInfo.from_place || oldFlight.data().from_place,
            no: flightInfo.no || oldFlight.data().no,
            price: flightInfo.price || oldFlight.data().price,
            to_place: flightInfo.to_place || oldFlight.data().to_place
        }

        const updatedFlight = await db.collection('flight').doc(flightInfo.id).update(updateFlight)
        if (!updatedFlight) throw new Error('Failed to update flight!')
        
        return updateFlight
    }

    public deleteFlight = async (flightId: string) => {
        const flight = await db.collection('flight').doc(flightId).get()
        if (!flight.exists) throw new Error('Flight not found!')

        const deletedFlight = await db.collection('flight').doc(flightId).delete()
        if (!deletedFlight) throw new Error('Failed to delete flight!')

        return true
    }
}