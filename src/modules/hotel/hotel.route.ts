import express from "express";
import Container from "typedi";
import { AuthMiddleware } from "../auth/auth.middleware";
import { ImageMiddleware } from "../image/image.middleware";
import { HotelController } from "./hotel.controller";

const hotelRoute = express.Router();
const authMiddle = Container.get(AuthMiddleware);
const imageMiddleware = Container.get(ImageMiddleware);
const hotelController = Container.get(HotelController);

hotelRoute.post(
  "/create-hotel",
  imageMiddleware.upload.single("image"),
  authMiddle.authentication,
  hotelController.createHotel
);

hotelRoute.get(
  "/get-hotel-by-id",
  authMiddle.authentication,
  hotelController.getHotelById
);

hotelRoute.patch(
  "/update-hotel",
  imageMiddleware.upload.single("image"),
  authMiddle.authentication,
  hotelController.updateHotel
);

hotelRoute.delete(
  "/delete-hotel",
  authMiddle.authentication,
  hotelController.removeHotel
);

export default hotelRoute;
