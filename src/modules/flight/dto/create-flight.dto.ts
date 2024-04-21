import { Expose, Transform, plainToClass } from "class-transformer";
import { Request } from "express";
import { Timestamp } from "firebase-admin/firestore";

export class CreateFlightDTO {
  @Expose()
  airline: string;

  @Expose()
  arrive_time: string;

  @Expose()
  departure_time: string;

  @Expose()
  facilities: string[];

  @Expose()
  from_place: string;

  @Expose()
  no: string;

  @Expose()
  price: number;

  @Expose()
  to_place: string;

  static fromRequest = (req: Request) => {
    return plainToClass(CreateFlightDTO, req.body, {
      excludeExtraneousValues: true,
    });
  };
}
