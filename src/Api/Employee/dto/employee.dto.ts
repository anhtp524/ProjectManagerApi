import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEmployeeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    birthday: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    idCard: string

    @ApiProperty()
    @IsString()
    phoneNumber: string

    @ApiProperty()
    @IsArray()
    technology: string[]

    @ApiProperty()
    @IsNumber()
    experience: number

    @ApiProperty()
    @IsArray()
    language: string[]

    @ApiProperty()
    @IsArray()
    certificate: string[]
    
}

export class UpdateEmployeeDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    address: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    phoneNumber: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    technology: string[]

    @ApiProperty()
    @IsArray()
    @IsOptional()
    language: string[]

    @ApiProperty()
    @IsArray()
    @IsOptional()
    certificate: string[]
}