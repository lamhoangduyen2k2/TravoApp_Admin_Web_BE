import Container, { Service } from "typedi";
import { auth, db } from "../../database/firebase-admin";
import { ImageService } from "../image/image.service";
import { HotelDTO } from "./dto/hotel.dto";
import { UpdateHotelDTO } from "./dto/update-hotel.dto";

@Service()
export class HotelService {
  imageService = Container.get(ImageService);

  public createHotel = async (
    hotelInfo: HotelDTO,
    img: Express.Multer.File
  ) => {
    const imageUrl = await this.imageService.uploadImage(img);
    if (!imageUrl) throw new Error("Image upload fail!");

    const hotel = {
      ...hotelInfo,
      image: imageUrl,
    };

    const newHotel = await db.collection("hotel").add(hotel);
    if (!newHotel) throw new Error("Create hotel fail!");

    return newHotel;
  };

  public getHotelById = async (hotelId: string) => {
    const hotel = await db.collection("hotel").doc(hotelId).get();
    if (!hotel.exists) throw new Error("Hotel not found!");

    return { id: hotel.id, ...hotel.data() };
  };

  public updateHotel = async(hotelInfo: UpdateHotelDTO, file: Express.Multer.File) => {
    const hotel = await db.collection("hotel").doc(hotelInfo.id).get();
    if (!hotel.exists) throw new Error("Hotel not found!");

    let hotelObj = {
        image: hotel.data().image,
        information: hotelInfo.information ? hotelInfo.information : hotel.data().information,
        location: hotelInfo.location ? hotelInfo.location : hotel.data().location,
        location_description: hotelInfo.location_description ? hotelInfo.location_description : hotel.data().location_description,
        max_guest: hotelInfo.max_guest ? hotelInfo.max_guest : hotel.data().max_guest,
        max_room: hotelInfo.max_room ? hotelInfo.max_room : hotel.data().max_room,
        name: hotelInfo.name ? hotelInfo.name : hotel.data().name,
        price: hotelInfo.price ? hotelInfo.price : hotel.data().price,
        rating: hotelInfo.rating ? hotelInfo.rating : hotel.data().rating,
        total_review: hotelInfo.total_review ? hotelInfo.total_review : hotel.data().total_review,
        type_price: hotelInfo.type_price ? hotelInfo.type_price : hotel.data().type_price,
    }
    
    if (file) {
        const imageUrl = await this.imageService.uploadImage(file);
        if (!imageUrl) throw new Error("Image upload fail!");
        hotelObj = {...hotelObj, image: imageUrl};
    }
    console.log("🚀 ~ HotelService ~ updateHotel=async ~ hotelObj:", hotelObj)

    const updatedHotel = await db.collection("hotel").doc(hotelInfo.id).update(hotelObj);
    if (!updatedHotel) throw new Error("Update hotel fail!");

    return true;
  };

  public removeHotel = async (hotelId: string) => {
    const hotel = await db.collection("hotel").doc(hotelId).get();
    if (!hotel.exists) throw new Error("Hotel not found!");

    await db.collection("hotel").doc(hotelId).delete();

    return true;
  }
}
