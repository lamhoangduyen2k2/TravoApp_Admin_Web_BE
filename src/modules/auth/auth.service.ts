import Container, { Service } from "typedi";
import { auth } from "../../database/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { TokenService } from "../../token/token.service";

@Service()
export class AuthService {
  tokenService = Container.get(TokenService);
  loginAdmin = async (email: string, password: string) => {
    if (email !== process.env.ADMIN_EMAIL) {
      throw new Error("Invalid email");
    }

    const admin = await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const token = await this.tokenService.createTokenByLogin(
          userCredential.user.uid
        );

        return { email: userCredential.user.email, ...token };
      })
      .catch((error) => {
        console.log("🚀 ~ AuthService ~ loginAdmin= ~ error:", error)
        throw new Error("Email or password is incorrect!");
      });

    return admin;
  };

  logoutAdmin = async () => {
    const result = await signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log("🚀 ~ AuthService ~ logoutAdmin= ~ error:", error)
      throw new Error("Logout failed!");
    });

    return result;
  };

  
}
