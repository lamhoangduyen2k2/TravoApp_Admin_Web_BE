import { Inject, Service } from "typedi";
import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { Pagination } from "../../helpers/pagination";

@Service()
export class UserController {
    constructor(@Inject() private userService : UserService) {
        this.userService = userService;
    }

    public getUsers = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const pagination = Pagination.getPagination(req)
            const users = await this.userService.getUsers(pagination);
            res.status(200).json({ message: users[0], pagination: users[1]});
        } catch (error) {
            console.log("🚀 ~ UserController ~ getUsers= ~ error:", error)
            next(error);
        }
    }

    public getHotels = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const pagination = Pagination.getPagination(req)
            const hotels = await this.userService.getHotels(pagination);
            res.status(200).json({ message: hotels[0], pagination: hotels[1]});
        } catch (error) {
            console.log("🚀 ~ UserController ~ getUsers= ~ error:", error)
            next(error);
        }
    }

    public getFlights = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const pagination = Pagination.getPagination(req)
            const flights = await this.userService.getFlights(pagination);
            res.status(200).json({ message: flights[0], pagination: flights[1]});
        } catch (error) {
            console.log("🚀 ~ UserController ~ getUsers= ~ error:", error)
            next(error);
        }
    }

    public getPlaces = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const pagination = Pagination.getPagination(req)
            const places = await this.userService.getPlaces(pagination);
            res.status(200).json({ message: places[0], pagination: places[1]});
        } catch (error) {
            console.log("🚀 ~ UserController ~ getUsers= ~ error:", error)
            next(error);
        }
    }

    public getPromos = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const pagination = Pagination.getPagination(req)
            const promos = await this.userService.getPromos(pagination);
            res.status(200).json({ message: promos[0], pagination: promos[1]});
        } catch (error) {
            console.log("🚀 ~ UserController ~ getUsers= ~ error:", error)
            next(error);
        }
    }
}