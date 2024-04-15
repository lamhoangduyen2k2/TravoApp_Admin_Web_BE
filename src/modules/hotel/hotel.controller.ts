import { Inject, Service } from "typedi";
import { HotelService } from "./hotel.service";
import { BodyResquest } from "../../helpers/base.request";
import { HotelDTO } from "./dto/hotel.dto";
import { NextFunction, Request, Response } from "express";
import { UpdateHotelDTO } from "./dto/update-hotel.dto";

@Service()
export class HotelController {
  constructor(@Inject() private hotelService: HotelService) {}

  public createHotel = async (
    req: BodyResquest<HotelDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const hotelInfo = HotelDTO.fromRequest(req);
      const img = req.file as Express.Multer.File;
      const result = await this.hotelService.createHotel(hotelInfo, img);

      res.status(200).json({ message: result });
    } catch (error) {
      console.log("🚀 ~ HotelController ~ error:", error);
      next(error);
    }
  };

  public getHotelById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const hotelId = req.query.hotelId
        ? req.query.hotelId.toString()
        : undefined;
      const result = await this.hotelService.getHotelById(hotelId);

      res.status(200).json({ message: result });
    } catch (error) {
      console.log("🚀 ~ HotelController ~ error:", error);
      next(error);
    }
  };

    public updateHotel = async (
        req: BodyResquest<UpdateHotelDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
        const hotelInfo = UpdateHotelDTO.fromRequest(req);
        const img = req.file as Express.Multer.File;
        const result = await this.hotelService.updateHotel(hotelInfo, img);
    
        res.status(200).json({ message: result });
        } catch (error) {
        console.log("🚀 ~ HotelController ~ error:", error);
        next(error);
        }
    };

    public removeHotel = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
        const hotelId = req.query.hotelId
            ? req.query.hotelId.toString()
            : undefined;
        const result = await this.hotelService.removeHotel(hotelId);
    
        res.status(200).json({ message: result });
        } catch (error) {
        console.log("🚀 ~ HotelController ~ error:", error);
        next(error);
        }
    }
}
