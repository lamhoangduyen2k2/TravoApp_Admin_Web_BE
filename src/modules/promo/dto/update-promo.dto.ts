import { Expose, Transform, plainToClass } from "class-transformer";
import { Request } from "express";

export class UpdatePromoDTO {
    @Expose()
    id: string
    
    @Expose()
    code: string;

    @Transform((value) => value.obj.price && Number(value.obj.price))
    @Expose()
    price: number;

    static fromRequest = (req: Request) => {
        return plainToClass(UpdatePromoDTO, req.body, { excludeExtraneousValues: true })
    }
}