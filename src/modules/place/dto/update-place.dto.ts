import { Expose, Transform, plainToClass } from "class-transformer";
import { Request } from "express";

export class UpdatePlaceDTO {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    desc: string;

    @Transform((value) => value.obj.rating && Number(value.obj.rating))
    @Expose()
    rating: number;

    static fromRequest = (req: Request) => {
        return plainToClass(UpdatePlaceDTO, req.body, { excludeExtraneousValues: true });
    }
}