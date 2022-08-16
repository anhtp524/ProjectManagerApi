import { IsNotEmpty, IsString } from "class-validator";

export class CreateStatusDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    status: string
}

export class UpdateStatusDto {
    @IsNotEmpty()
    @IsString()
    status: string
}