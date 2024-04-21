import express from "express";
import Container from "typedi";
import { FlightController } from "./flight.controller";
import { AuthMiddleware } from "../auth/auth.middleware";

const flightRoute = express.Router();
const authMiddware = Container.get(AuthMiddleware);
const flightController = Container.get(FlightController);

flightRoute.get(
  "/get-flight-by-id",
  authMiddware.authentication,
  flightController.getFlightById
);

flightRoute.post(
  "/create-flight",
  authMiddware.authentication,
  flightController.createFlight
);

flightRoute.patch(
  "/update-flight",
  authMiddware.authentication,
  flightController.updateFlight
);

flightRoute.delete(
  "/delete-flight",
  authMiddware.authentication,
  flightController.deleteFlight
);

export default flightRoute;