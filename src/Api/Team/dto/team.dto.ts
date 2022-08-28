import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    founding: Date

    @IsNotEmpty()
    @IsString()
    manager: string

    @IsArray()
    member: string[]


    @IsArray()
    project: string[]
}

export class UpdateTeamDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsDate()
    founding: Date

    @IsNotEmpty()
    @IsString()
    manager: string

    @IsArray()
    member: string[]


    @IsArray()
    project: string[]
}