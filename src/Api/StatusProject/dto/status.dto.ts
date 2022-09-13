import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string
}

export class UpdateStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string
}