import { Request } from "express";
import multer from "multer";
import { Service } from "typedi";

@Service()
export class ImageMiddleware {
  private multerFilter = (req: Request, file: Express.Multer.File, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("File is not image"), false);
    }
  };

  public upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: this.multerFilter,
  });
}
