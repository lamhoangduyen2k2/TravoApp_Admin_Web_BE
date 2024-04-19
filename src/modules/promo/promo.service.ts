import Container, { Service } from "typedi";
import { ImageService } from "../image/image.service";
import { CreatePromoDTO } from "./dto/create-promo.dto";
import { db } from "../../database/firebase-admin"
import { UpdatePromoDTO } from "./dto/update-promo.dto";

@Service()
export class PromosService {
    imgService = Container.get(ImageService);

    public createPromo = async (promo: CreatePromoDTO, image: Express.Multer.File) => {
        const img = await this.imgService.uploadImage(image);
        if (!img) throw new Error("Failed to upload image");

        const newPromo = await db.collection("promo").add({ ...promo, endow: img }); 
        return newPromo;
    }

    public getPromoById = async (promoId: string) => {
        const promo = await db.collection("promo").doc(promoId).get();
        if (!promo.exists) throw new Error("Promo not found");

        return {id: promo.id, ...promo.data()};
    }

    public updatePromo = async (promo: UpdatePromoDTO, image: Express.Multer.File) => {
        const oldPromo = await db.collection("promo").doc(promo.id).get();
        if (!oldPromo.exists) throw new Error("Promo not found");

        const promoObj = {
            code: promo.code || oldPromo.data().code,
            price: promo.price || oldPromo.data().price,
            endow: oldPromo.data().endow
        }

        if (image) {
            const img = await this.imgService.uploadImage(image);
            if (!img) throw new Error("Failed to upload image");
            promoObj.endow = img;
        }

        const updatedPromo = await db.collection("promo").doc(promo.id).update(promoObj);
        if (!updatedPromo) throw new Error("Failed to update promo");

        return true;
    }

    public removePromo = async (promoId: string) => {
        const promo = await db.collection("promo").doc(promoId).get();
        if (!promo.exists) throw new Error("Promo not found");

        const removedPromo = await db.collection("promo").doc(promoId).delete();
        if (!removedPromo) throw new Error("Failed to remove promo");

        return true;
    }
}