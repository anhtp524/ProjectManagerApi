import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    founding: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    manager: string

    @ApiProperty()
    @IsArray()
    member: string[]

    @ApiProperty()
    @IsArray()
    project: string[]
}

export class UpdateTeamDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    founding: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    manager: string

    @ApiProperty()
    @IsArray()
    member: string[]

    @ApiProperty()
    @IsArray()
    project: string[]
}