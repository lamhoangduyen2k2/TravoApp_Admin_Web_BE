import express from "express";
import Container from "typedi";
import { AuthMiddleware } from "../auth/auth.middleware";
import { ImageMiddleware } from "../image/image.middleware";
import { PlaceController } from "./place.controller";

const placeRoute = express.Router();
const authMiddle = Container.get(AuthMiddleware);
const imgMiddleware = Container.get(ImageMiddleware);
const placeController = Container.get(PlaceController);

placeRoute.post(
  "/create-place",
  imgMiddleware.upload.single("image"),
  authMiddle.authentication,
  placeController.createPlace
);
placeRoute.get("/get-place-by-id", authMiddle.authentication, placeController.getPlaceById);
placeRoute.patch(
  "/update-place",
  imgMiddleware.upload.single("image"),
  authMiddle.authentication,
  placeController.updatePlace
);
placeRoute.delete("/remove-place", authMiddle.authentication, placeController.removePlace);

export default placeRoute;