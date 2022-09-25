import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTeamDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({type: Date})
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
    @IsOptional()
    @IsString()
    name: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string

    @ApiProperty()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    founding: Date

    @ApiProperty()
    @IsOptional()
    @IsString()
    manager: string

    @ApiProperty()
    @IsOptional()
    @IsArray()
    member: string[]

    @ApiProperty()
    @IsOptional()
    @IsArray()
    project: string[]
}