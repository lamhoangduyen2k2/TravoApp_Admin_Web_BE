import { sign, verify } from "jsonwebtoken";
import { Service } from "typedi";

@Service()
export class TokenService {
  public createTokenByLogin = async (
    userId: string | number,
  ) => {
    let accessToken = "";

    //Create accessToken
    accessToken = sign({ _id: userId }, process.env.SECRET_KEY, {
      expiresIn: "1800s",
    });

    const expiredAccess: number = Date.now() + 1800 * 1000;

    return { accessToken, expiredAccess };
  };

  public verifyToken = async (accessToken: string) => {
    let userId = "";
    let iatAccessToken = "";

    //Verify token
    verify(accessToken, process.env.SECRET_KEY, (err, payload) => {
      if (err) throw new Error("Token expired!");
      userId = payload["_id"];
      iatAccessToken = payload["iat"];
    });

    return { userId, iatAccessToken };
  };
}
