import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsInt,
    Min,
    Max,
    MinLength,
    MaxLength,
} from "class-validator";
export class CoinDTO{
    @IsNotEmpty()
    @IsString()
    coinName!: string
}