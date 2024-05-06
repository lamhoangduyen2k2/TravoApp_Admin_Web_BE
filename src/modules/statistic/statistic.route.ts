import express from "express";
import Container from "typedi";
import { StatisticController } from "./statistic.controller";
import { AuthMiddleware } from "../auth/auth.middleware";

const statisticRoute = express.Router();
const statisticController = Container.get(StatisticController);
const authMiddleware = Container.get(AuthMiddleware);

statisticRoute.get(
  "/count-all-user",
  authMiddleware.authentication,
  statisticController.countAllUser
);
statisticRoute.get(
  "/count-all-flight",
  authMiddleware.authentication,
  statisticController.countAllFlight
);
statisticRoute.get(
  "/count-all-hotel",
  authMiddleware.authentication,
  statisticController.countAllHotel
);
statisticRoute.get(
  "/count-all-place",
  authMiddleware.authentication,
  statisticController.countAllPlace
);
statisticRoute.get(
  "/count-all-promo",
  authMiddleware.authentication,
  statisticController.countAllPromo
);
statisticRoute.get(
  "/count-all-room",
  authMiddleware.authentication,
  statisticController.countAllRoom
);
statisticRoute.get(
  "/count-all-booking",
  authMiddleware.authentication,
  statisticController.countAllBooking
);
statisticRoute.get(
  "/count-all-booking-flight",
  authMiddleware.authentication,
  statisticController.countAllBookingFlight
);

export default statisticRoute;
