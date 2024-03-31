import express from "express";
import { AuthController } from "./auth.controller";
import Container from "typedi";

const authRoute = express.Router();
const authController = Container.get(AuthController);

authRoute.post("/login", authController.loginAdmin);
authRoute.post("/logout", authController.logoutAdmin);

export default authRoute;