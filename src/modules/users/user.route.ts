import express from "express";
import Container from "typedi";
import { AuthMiddleware } from "../auth/auth.middleware";
import { UserController } from "./user.controller";

const userRoute = express.Router();
const authMiddle = Container.get(AuthMiddleware);
const userController = Container.get(UserController);

userRoute.get("/get-users", authMiddle.authentication, userController.getUsers);
userRoute.get("/get-user-by-id", authMiddle.authentication, userController.getUserById);
userRoute.get("/get-hotels", authMiddle.authentication, userController.getHotels);
userRoute.get("/get-flights", authMiddle.authentication, userController.getFlights);
userRoute.get("/get-places", authMiddle.authentication, userController.getPlaces);
userRoute.get("/get-promos", authMiddle.authentication, userController.getPromos);

export default userRoute;
