import { Service } from "typedi";
import { auth, db } from "../../database/firebase-admin";
import { Pagination } from "../../helpers/pagination";

@Service()
export class UserService {
  public getUsers = async (pagination: Pagination) => {
    const userList = [];
    const users = await db.collection("user").get();

    if (users.docs.length <= 0) throw new Error("User not found!");

    const totalPage = Math.ceil(users.docs.length / pagination.limit);

    if (pagination.page > totalPage) throw new Error("Page not found!");

    users.docs.forEach((doc, index) => {
      if (index >= pagination.offset && index <= pagination.to) {
        userList.push({ id: doc.id, ...doc.data() });
      }
    });

    return [
      userList,
      { page: pagination.page, limit: pagination.limit, total: totalPage },
    ];
  };

  public getHotels = async (pagination: Pagination) => {
    const hotels = await db.collection("hotel").get();
    const hotelList = [];

    if (hotels.docs.length <= 0) throw new Error("Hotel not found!");

    const totalPage = Math.ceil(hotels.docs.length / pagination.limit);

    if (pagination.page > totalPage) throw new Error("Page not found!");

    hotels.docs.forEach((doc, index) => {
      console.log("🚀 ~ UserService ~ hotelList ~ doc:", doc.data());
      if (index >= pagination.offset && index <= pagination.to) {
        hotelList.push({ id: doc.id, ...doc.data() });
      }
    });
    return [
      hotelList,
      { page: pagination.page, limit: pagination.limit, total: totalPage },
    ];
  };

  public getFlights = async (pagination: Pagination) => {
    const flights = await db.collection("flight").get();
    const flightList = [];

    if (flights.empty) throw new Error("Flight not found!");

    const totalPage = Math.ceil(flights.docs.length / pagination.limit);
    if (pagination.page > totalPage) throw new Error("Page not found!");

    flights.docs.forEach((doc, index) => {
      if (index >= pagination.offset && index <= pagination.to) {
        flightList.push({ id: doc.id, ...doc.data(), arrive_time: doc.data().arrive_time.toDate(), departure_time: doc.data().departure_time.toDate() });
      }
    });

    return [
      flightList,
      { page: pagination.page, limit: pagination.limit, total: totalPage },
    ];
  };

  public getPlaces = async (pagination: Pagination) => {
    const places = await db.collection("place").get();
    const placeList = [];

    if (places.docs.length <= 0) throw new Error("Place not found!");

    const totalPage = Math.ceil(places.docs.length / pagination.limit);

    if (pagination.page > totalPage) throw new Error("Page not found!");

    places.docs.forEach((doc, index) => {
      if (index >= pagination.offset && index <= pagination.to) {
        placeList.push({ id: doc.id, ...doc.data() });
      }
    });

    return [
      placeList,
      { page: pagination.page, limit: pagination.limit, total: totalPage },
    ];
  };

  public getPromos = async (pagination: Pagination) => {
    const promos = await db.collection("promo").get();
    const promoList = [];

    if (promos.docs.length <= 0) throw new Error("Promo not found!");

    const totalPage = Math.ceil(promos.docs.length / pagination.limit);

    if (pagination.page > totalPage) throw new Error("Page not found!");

    promos.docs.forEach((doc, index) => {
      if (index >= pagination.offset && index <= pagination.to) {
        promoList.push({ id: doc.id, ...doc.data() });
      }
    });

    return [
      promoList,
      { page: pagination.page, limit: pagination.limit, total: totalPage },
    ];
  };
}
