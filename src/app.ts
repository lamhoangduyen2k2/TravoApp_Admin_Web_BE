import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccountJson from "../travoapps-b31c4-firebase-adminsdk-bexhu-1d7d257ed4.json";
import { ServiceAccount } from "firebase-admin";
import authRoute from "./modules/auth/auth.route";
import userRoute from "./modules/users/user.route";
import cors from "cors"
import hotelRoute from "./modules/hotel/hotel.route";
import roomRoute from "./modules/room/room.route";

(async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/api/auth", authRoute);
  app.use("/api/admin", userRoute);
  app.use("/api/hotel", hotelRoute);
  app.use("/api/room", roomRoute);

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ error: error.message });
  })

  app.listen(3000, () => {
    console.log(`Express is listening at http://localhost:3000`);
  });
})();
