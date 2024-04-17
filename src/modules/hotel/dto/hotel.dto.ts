import { Expose, Transform, plainToClass } from "class-transformer";
import { Request } from "express";

export class HotelDTO {
  @Expose()
  information: string;

  @Expose()
  location: string;

  @Expose()
  location_description: string;

  @Transform((value) => value.obj.max_guest && Number(value.obj.max_guest))
  @Expose()
  max_guest: number;

  @Transform((value) => value.obj.max_room && Number(value.obj.max_room))
  @Expose()
  max_room: number;

  @Expose()
  name: string;

  @Transform((value) => value.obj.price && Number(value.obj.price))
  @Expose()
  price: number;

  @Transform((value) => value.obj.rating && Number(value.obj.rating))
  @Expose()
  rating: number;

  @Transform((value) => value.obj.total_review && Number(value.obj.total_review))
  @Expose()
  total_review: number;

  @Expose()
  type_price: string;

  static fromRequest = (req: Request) => {
    return plainToClass(HotelDTO, req.body, { excludeExtraneousValues: true });
  };
}
