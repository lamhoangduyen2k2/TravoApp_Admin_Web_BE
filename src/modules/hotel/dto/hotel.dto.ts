import { Expose, plainToClass } from "class-transformer";
import { Request } from "express";

export class HotelDTO {
  @Expose()
  information: string;

  @Expose()
  location: string;

  @Expose()
  location_description: string;

  @Expose()
  max_guest: number;

  @Expose()
  max_room: number;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  rating: number;

  @Expose()
  total_review: number;

  @Expose()
  type_price: string;

  static fromRequest = (req: Request) => {
    return plainToClass(HotelDTO, req.body, { excludeExtraneousValues: true });
  };
}
