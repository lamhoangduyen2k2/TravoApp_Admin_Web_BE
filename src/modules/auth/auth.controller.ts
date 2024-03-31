import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Inject, Service } from "typedi";

@Service()
export class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Request body:", req.body.email);
      const result = await this.authService.loginAdmin(
        req.body.email,
        req.body.password
      );

      res.status(200).send({ message: result });
    } catch (error) {
      console.log("🚀 ~ AuthController ~ loginAdmin ~ error:", error);
      next(error);
    }
  };

  logoutAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.logoutAdmin();
      res.status(200).send({ message: result });
    } catch (error) {
      console.log("🚀 ~ AuthController ~ logoutAdmin ~ error:", error);
      next(error);
    }
  };
}
