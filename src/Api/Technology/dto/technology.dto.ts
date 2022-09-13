import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTechnologyDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string
}

export class UpdateTechnologyDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string
}