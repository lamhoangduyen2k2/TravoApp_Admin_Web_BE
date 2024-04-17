import { Exclude, Expose, Transform, plainToClass } from "class-transformer";
import { Request } from "express";

export class UpdateRoomDTO {
    @Expose()
    id: string;
    
    @Exclude()
    hotel: string;
  
    @Transform((value) => value.obj.max_guest && Number(value.obj.max_guest))
    @Expose()
    max_guest: number;
  
    @Expose()
    name: string;
  
    @Transform((value) => value.obj.price && Number(value.obj.price))
    @Expose()
    price: number;
  
    @Expose()
    services: string[];
  
    @Transform((value) => value.obj.total && Number(value.obj.total))
    @Expose()
    total: number;
  
    static fromRequest = (req: Request) => {
      return plainToClass(UpdateRoomDTO, req.body, { excludeExtraneousValues: true });
    };
  }