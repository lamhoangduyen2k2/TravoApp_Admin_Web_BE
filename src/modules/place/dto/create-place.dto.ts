import { Expose, Transform, plainToClass } from "class-transformer";
import { Request } from "express";

export class CreatePlaceDTO {
    @Expose()
    name: string;

    @Expose()
    desc: string;

    @Transform((value) => value.obj.rating && Number(value.obj.rating))
    @Expose()
    rating: number;

    static fromRequest = (req: Request) => {
        return plainToClass(CreatePlaceDTO, req.body, { excludeExtraneousValues: true });
    }
}