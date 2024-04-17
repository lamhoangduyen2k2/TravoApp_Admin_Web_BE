import express from "express";
import Container from "typedi";
import { RoomController } from "./room.controller";
import { AuthMiddleware } from "../auth/auth.middleware";
import { ImageMiddleware } from "../image/image.middleware";

const roomRoute = express.Router();
const roomController = Container.get(RoomController);
const authMiddle = Container.get(AuthMiddleware);
const imageMiddleware = Container.get(ImageMiddleware);

roomRoute.post(
  "/create-room",
  imageMiddleware.upload.single("image"),
  authMiddle.authentication,
  roomController.createRoom
);
roomRoute.get(
  "/get-room-by-id",
  authMiddle.authentication,
  roomController.getRoomById
);
roomRoute.patch(
  "/update-room",
  imageMiddleware.upload.single("image"),
  authMiddle.authentication,
  roomController.updateRoom
);
roomRoute.delete(
  "/delete-room",
  authMiddle.authentication,
  roomController.removeRoom
);

export default roomRoute;
