import { Inject, Service } from "typedi";
import { PlaceService } from "./place.service";
import { BodyResquest } from "../../helpers/base.request";
import { CreatePlaceDTO } from "./dto/create-place.dto";
import { NextFunction, Request, Response } from "express";
import { UpdatePlaceDTO } from "./dto/update-place.dto";

@Service()
export class PlaceController {
    constructor(@Inject() private placeService: PlaceService) {}

    public createPlace = async (req: BodyResquest<CreatePlaceDTO>, res: Response, next: NextFunction) => {
        try {
            const placeInfo = CreatePlaceDTO.fromRequest(req);
            const img = req.file as Express.Multer.File;
            const newPlace = await this.placeService.createPlace(placeInfo, img);
            return res.status(200).json({message: newPlace});
        } catch (error) {
            console.log("🚀 ~ PlaceController ~ createPlace= ~ error:", error)
            next(error);
        }
    }

    public getPlaceById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const placeId = req.query.placeId.toString();
            const place = await this.placeService.getPlaceById(placeId);
            return res.status(200).json(place);
        } catch (error) {
            console.log("🚀 ~ PlaceController ~ getPlaceById= ~ error:", error)
            next(error);
        }
    }

    public updatePlace = async (req: BodyResquest<UpdatePlaceDTO>, res: Response, next: NextFunction) => {
        try {
            const placeInfo = UpdatePlaceDTO.fromRequest(req);
            const img = req.file as Express.Multer.File;
            const updatedPlace = await this.placeService.updatePlace(placeInfo, img);
            return res.status(200).json({message: updatedPlace});
        } catch (error) {
            console.log("🚀 ~ PlaceController ~ updatePlace= ~ error:", error)
            next(error);
        }
    }

    public removePlace = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const placeId = req.query.placeId.toString();
            const deletedPlace = await this.placeService.removePlace(placeId);
            return res.status(200).json({message: deletedPlace});
        } catch (error) {
            console.log("🚀 ~ PlaceController ~ removePlace= ~ error:", error)
            next(error);
        }
    }
}