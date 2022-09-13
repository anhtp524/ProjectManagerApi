import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string
}

export class UpdateProjectTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string
}