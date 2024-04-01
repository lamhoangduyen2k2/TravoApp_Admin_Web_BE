import Container, { Service } from "typedi";
import { TokenService } from "../../token/token.service";
import { NextFunction, Request, Response } from "express";

@Service()
export class AuthMiddleware {
  tokenService = Container.get(TokenService);

  authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header("Authorization");
        const auth = authHeader?.split(" ")[1];
  
        if (!auth) throw new Error("Token invalid!");
  
        const payload = await this.tokenService.verifyToken(auth);
  
        //Check role User
        req.body._uId = payload.userId;
  
        next();
      } catch (error) {
        next(error);
      }
  };
}
