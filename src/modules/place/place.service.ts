import Container, { Service } from "typedi";
import { ImageService } from "../image/image.service";
import { CreatePlaceDTO } from "./dto/create-place.dto";
import { db } from "../../database/firebase-admin";
import { UpdatePlaceDTO } from "./dto/update-place.dto";

@Service()
export class PlaceService {
    imageService = Container.get(ImageService);

    public createPlace = async (place: CreatePlaceDTO, img: Express.Multer.File) => {
        const imageUrl = await this.imageService.uploadImage(img);
        // save place to database
        const newPlace = await db.collection("place").add({ ...place, image: imageUrl });

        return newPlace;
    }

    public getPlaceById = async (placeId: string) => {
        const place = await db.collection("place").doc(placeId).get();
        if (!place.exists) throw new Error("Place not found");
        
        return {message: {id: place.id, ...place.data()}};
    }

    public updatePlace = async (place: UpdatePlaceDTO, img: Express.Multer.File) => {
        const oldPlace = await db.collection("place").doc(place.id).get();
        if (!oldPlace.exists) throw new Error("Place not found");

        let placeObj = {
            name: place.name ? place.name : oldPlace.data().name,
            desc: place.desc ? place.desc : oldPlace.data().desc,
            rating: place.rating ? place.rating : oldPlace.data().rating,
            image: oldPlace.data().image,
        }

        if (img) {
            const imageUrl = await this.imageService.uploadImage(img);
            placeObj = {...placeObj, image: imageUrl};
        }
        // update place in database
        const updatedPlace = await db.collection("place").doc(place.id).update(placeObj);
        if (!updatedPlace) throw new Error("Update place failed");

        return true;
    }

    public removePlace = async (placeId: string) => {
        const place = await db.collection("place").doc(placeId).get();
        if (!place.exists) throw new Error("Place not found");

        const deletedPlace = await db.collection("place").doc(placeId).delete();
        if (!deletedPlace) throw new Error("Delete place failed");

        return true;
    }
}