import { Exclude, Expose, plainToClass } from "class-transformer";
import { Request } from "express";

export class UpdateFlightDTO {
  @Expose()
  id: string;

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

  @Exclude()
  seat: object[];

  static fromRequest = (req: Request) => {
    return plainToClass(UpdateFlightDTO, req.body, {
      excludeExtraneousValues: true,
    });
  };
}
