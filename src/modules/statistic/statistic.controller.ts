import { Inject, Service } from "typedi";
import { StatisticService } from "./statistic.service";
import { NextFunction, Request, Response } from "express";

@Service()
export class StatisticController {
  constructor(@Inject() private statisticService: StatisticService) {}

  public countAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const result = await this.statisticService.countAllUser();
        res.status(200).json({message: result});
    } catch (error) {
        console.log("🚀 ~ StatisticController ~ error:", error)
        next(error);
    }
  };

    public countAllFlight = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.statisticService.countAllFlight();
            res.status(200).json({message: result});
        } catch (error) {
            console.log("🚀 ~ StatisticController ~ error:", error)
            next(error);
        }
    };

    public countAllHotel = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.statisticService.countAllHotel();
            res.status(200).json({message: result});
        } catch (error) {
            console.log("🚀 ~ StatisticController ~ error:", error)
            next(error);
        }
    };

    public countAllPlace = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.statisticService.countAllPlace();
            res.status(200).json({message: result});
        } catch (error) {
            console.log("🚀 ~ StatisticController ~ error:", error)
            next(error);
        }
    };

    public countAllPromo = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.statisticService.countAllPromo();
            res.status(200).json({message: result});
        } catch (error) {
            console.log("🚀 ~ StatisticController ~ error:", error)
            next(error);
        }
    };

    public countAllRoom = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.statisticService.countAllRoom();
            res.status(200).json({message: result});
        } catch (error) {
            console.log("🚀 ~ StatisticController ~ error:", error)
            next(error);
        }
    };

    public countAllBooking = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.statisticService.countAllBooking();
            res.status(200).json({message: result});
        } catch (error) {
            console.log("🚀 ~ StatisticController ~ error:", error)
            next(error);
        }
    };

    public countAllBookingFlight = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.statisticService.countAllBookingFlight();
            res.status(200).json({message: result});
        } catch (error) {
            console.log("🚀 ~ StatisticController ~ error:", error)
            next(error);
        }
    };
}
