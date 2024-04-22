import Container, { Service } from "typedi";
import { ImageService } from "../image/image.service";
import { CreateRoomDTO } from "./dto/create-room.dto";
import { db } from "../../database/firebase-admin";
import { UpdateRoomDTO } from "./dto/update-room.dto";
import { Pagination } from "../../helpers/pagination";

@Service()
export class RoomService {
  imageSercie = Container.get(ImageService);

  public countTotalRoomsHotel = async (hotelId: string) => {
    let totalRooms = 0;
    const rooms = await db
      .collection("room")
      .where("hotel", "==", hotelId)
      .get();
    rooms.docs.forEach((doc) => {
      totalRooms = totalRooms + doc.data().total;
    });

    return totalRooms;
  };

  public countTotalRoomsForUpdate = async (hotelId: string, roomId: string) => {
    let totalRooms = 0;
    const rooms = await db
      .collection("room")
      .where("hotel", "==", hotelId)
      .get();
    rooms.docs.forEach((doc) => {
      if (doc.id !== roomId) {
        totalRooms = totalRooms + doc.data().total;
      }
    });

    return totalRooms;
  };

  public createRoom = async (
    roomInfo: CreateRoomDTO,
    img: Express.Multer.File
  ) => {
    const hotel = await db.collection("hotel").doc(roomInfo.hotel).get();
    if (!hotel.exists) throw new Error("Hotel not found");

    // const totalRooms = await this.countTotalRoomsHotel(roomInfo.hotel);
    // if (totalRooms + roomInfo.total > hotel.data().max_room)
    //   throw new Error("Total rooms exceed");

    const imgURL = await this.imageSercie.uploadImage(img);
    if (!imgURL) throw new Error("Upload image failed");

    const room = await db.collection("room").add({
      hotel: roomInfo.hotel,
      image: imgURL,
      max_guest: roomInfo.max_guest,
      name: roomInfo.name,
      price: roomInfo.price,
      services: roomInfo.services,
      total: roomInfo.total,
    });
    if (!room) throw new Error("Create room failed");

    return room;
  };

  public getRoomById = async (roomId: string) => {
    const room = await db.collection("room").doc(roomId).get();
    if (!room.exists) throw new Error("Room not found");

    return { id: room.id, ...room.data() };
  };

  public getRooms = async (pagination: Pagination) => {
    const roomList = [];
    const rooms = await db.collection("room").get();
    if (rooms.docs.length <= 0) throw new Error("Room not found!");

    const totalPage = Math.ceil(rooms.docs.length / pagination.limit);
    if (pagination.page > totalPage) throw new Error("Page not found!");

    rooms.docs.forEach((doc, index) => {
      if (index >= pagination.offset && index <= pagination.to) {
        roomList.push({ id: doc.id, ...doc.data() });
      }
    });

    return [
      roomList,
      { page: pagination.page, limit: pagination.limit, total: totalPage },
    ];
  };

  public updateRoom = async (
    roomInfo: UpdateRoomDTO,
    img: Express.Multer.File
  ) => {
    const room = await db.collection("room").doc(roomInfo.id).get();
    if (!room.exists) throw new Error("Room not found");

    const hotel = await db.collection("hotel").doc(room.data().hotel).get();
    if (!hotel.exists) throw new Error("Hotel not found");

    // const totalRooms = await this.countTotalRoomsForUpdate(
    //   room.data().hotel,
    //   roomInfo.id
    // );
    // if (totalRooms + roomInfo.total > hotel.data().max_room)
    //   throw new Error("Total rooms exceed");

    let roomObj = {
      hotel: room.data().hotel,
      image: room.data().image,
      max_guest: roomInfo.max_guest
        ? roomInfo.max_guest
        : room.data().max_guest,
      name: roomInfo.name ? roomInfo.name : room.data().name,
      price: roomInfo.price ? roomInfo.price : room.data().price,
      services: roomInfo.services ? roomInfo.services : room.data().services,
      total: roomInfo.total ? roomInfo.total : room.data().total,
    };

    if (img) {
      const imgURL = await this.imageSercie.uploadImage(img);
      if (!imgURL) throw new Error("Upload image failed");
      roomObj = { ...roomObj, image: imgURL };
    }

    await db.collection("room").doc(roomInfo.id).update(roomObj);
    return roomObj;
  };

  public removeRoom = async (roomId: string) => {
    const room = await db.collection("room").doc(roomId).get();
    if (!room.exists) throw new Error("Room not found");

    await db.collection("room").doc(roomId).delete();
    return true;
  };
}
