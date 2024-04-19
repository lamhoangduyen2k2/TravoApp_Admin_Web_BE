import { Inject, Service } from "typedi";
import { PromosService } from "./promo.service";
import { BodyResquest } from "../../helpers/base.request";
import { CreatePromoDTO } from "./dto/create-promo.dto";
import { NextFunction, Request, Response } from "express";
import { UpdatePromoDTO } from "./dto/update-promo.dto";

@Service()
export class PromoController {
    constructor(@Inject() private promoService: PromosService) {}

    public createPromo = async (
        req: BodyResquest<CreatePromoDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const promoInfo = CreatePromoDTO.fromRequest(req);
            const image = req.file as Express.Multer.File;
            const promo = await this.promoService.createPromo(promoInfo, image);
            
            return res.status(200).json({ message: promo });
        } catch (error) {
            console.log("🚀 ~ PromoService ~ error:", error)
            next(error);
        }
    }

    public getPromoById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const promoId = req.query.promoId.toString();
            const promo = await this.promoService.getPromoById(promoId);

            return res.status(200).json({ message: promo });
        } catch (error) {
            console.log("🚀 ~ PromoService ~ error:", error)
            next(error);
        }
    }

    public updatePromo = async (
        req: BodyResquest<UpdatePromoDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const promoInfo = UpdatePromoDTO.fromRequest(req);
            const image = req.file as Express.Multer.File;
            const promo = await this.promoService.updatePromo(promoInfo, image);

            return res.status(200).json({ message: promo });
        } catch (error) {
            console.log("🚀 ~ PromoService ~ error:", error)
            next(error);
        }
    }

    public removePromo = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const promoId = req.query.promoId.toString();
            const promo = await this.promoService.removePromo(promoId);

            return res.status(200).json({ message: promo });
        } catch (error) {
            console.log("🚀 ~ PromoService ~ error:", error)
            next(error);
        }
    }
}