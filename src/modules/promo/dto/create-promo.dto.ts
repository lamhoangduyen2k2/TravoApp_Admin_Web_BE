import { Expose, Transform, plainToClass } from "class-transformer";
import { Request } from "express";

export class CreatePromoDTO {
    @Expose()
    code: string;

    @Transform((value) => value.obj.price && Number(value.obj.price))
    @Expose()
    price: number;

    static fromRequest = (req: Request) => {
        return plainToClass(CreatePromoDTO, req.body, { excludeExtraneousValues: true })
    }
}