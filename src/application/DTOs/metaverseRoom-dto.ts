import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsNumber,
    IsInt,
    Min,
   ValidateNested,
    IsObject,
} from "class-validator";
import { Type } from 'class-transformer';
export class MetaverseRoomDTO{
    constructor(private readonly  roomAreaDTO: RoomAreaDTO) {
    }
    @IsString()
    @IsNotEmpty()
    roomName!: string

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => RoomAreaDTO)
    roomArea!: RoomAreaDTO;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    coinQuantity!: number
}

export class RoomAreaDTO {
    @IsNotEmpty()
    @IsNumber()
    xmin!: number;

    @IsNotEmpty()
    @IsNumber()
    xmax!: number;

    @IsNotEmpty()
    @IsNumber()
    ymin!: number;

    @IsNotEmpty()
    @IsNumber()
    ymax!: number;

    @IsNotEmpty()
    @IsNumber()
    zmin!: number;

    @IsNotEmpty()
    @IsNumber()
    zmax!: number;
}