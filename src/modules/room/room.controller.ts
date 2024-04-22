import { Inject, Service } from "typedi";
import { RoomService } from "./room.service";
import { BodyResquest } from "../../helpers/base.request";
import { CreateRoomDTO } from "./dto/create-room.dto";
import { NextFunction, Request, Response } from "express";
import { UpdateRoomDTO } from "./dto/update-room.dto";
import { Pagination } from "../../helpers/pagination";

@Service()
export class RoomController {
    constructor (@Inject() private roomService: RoomService) {}

    public createRoom = async (
        req: BodyResquest<CreateRoomDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const roomInfo = CreateRoomDTO.fromRequest(req);
            const img = req.file as Express.Multer.File;
            const room = await this.roomService.createRoom(roomInfo, img);
            res.status(200).json({ message: room });
        } catch (error) {
            next(error);
        }
    }

    public getRoomById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const roomId = req.query.roomId ? req.query.roomId.toString() : undefined;
            const room = await this.roomService.getRoomById(roomId);
            res.status(200).json({ message: room });
        } catch (error) {
            next(error);
        }
    }

    public getRooms = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const pagination = Pagination.getPagination(req);
            const rooms = await this.roomService.getRooms(pagination);
            res.status(200).json({ message: rooms[0], pagination: rooms[1]});
        } catch (error) {
            console.log("🚀 ~ RoomController ~ error:", error)
            next(error);
        }
    }

    public updateRoom = async (
        req: BodyResquest<UpdateRoomDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const roomInfo = UpdateRoomDTO.fromRequest(req);
            const img = req.file as Express.Multer.File;
            const room = await this.roomService.updateRoom(roomInfo, img);
            res.status(200).json({ message: room });
        } catch (error) {
            next(error);
        }
    }

    public removeRoom = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const roomId = req.query.roomId ? req.query.roomId.toString() : undefined;
            const room = await this.roomService.removeRoom(roomId);
            res.status(200).json({ message: room });
        } catch (error) {
            next(error);
        }
    }
}