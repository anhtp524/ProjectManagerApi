import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
    @IsOptional()
    @IsString()
    name: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    status: string
}