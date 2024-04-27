import { Inject, Service } from "typedi";
import { FlightService } from "./flight.service";
import { NextFunction, Request, Response } from "express";
import { BodyResquest } from "../../helpers/base.request";
import { CreateFlightDTO } from "./dto/create-flight.dto";
import { UpdateFlightDTO } from "./dto/update-flight.dto";

@Service()
export class FlightController {
    constructor(@Inject() private flightService: FlightService) {}

    public getFlightById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const flight = await this.flightService.getFlightById(req.query.flightId.toString())
            return res.json({message: flight})
        } catch (error) {
            return next(error)
        }
    }

    public createFlight = async (
        req: BodyResquest<CreateFlightDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const flightInfo = CreateFlightDTO.fromRequest(req)
            const flight = await this.flightService.createFlight(flightInfo)
            return res.status(200).json({message: flight})
        } catch (error) {
            return next(error)
        }
    }

    public updateFlight = async (
        req: BodyResquest<UpdateFlightDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const flightInfo = UpdateFlightDTO.fromRequest(req)
            const flight = await this.flightService.updateFlight(flightInfo)
            return res.status(200).json({message: flight})
        } catch (error) {
            console.log("🚀 ~ FlightController ~ error:", error)
            next(error)
        }
    }

    public deleteFlight = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const flight = await this.flightService.deleteFlight(req.query.flightId.toString())
            return res.status(200).json({message: flight})
        } catch (error) {
            return next(error)
        }
    }
}