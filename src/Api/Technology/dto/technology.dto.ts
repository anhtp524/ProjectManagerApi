import { IsNotEmpty, IsString } from "class-validator";

export class CreateTechnologyDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    status: string
}

export class UpdateTechnologyDto {
    @IsNotEmpty()
    @IsString()
    status: string
}