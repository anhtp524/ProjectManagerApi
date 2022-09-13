import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsString()
    typeProject: string

    @ApiProperty()
    @IsString()
    status: string
    
    @ApiProperty()
    @IsArray()
    technology: string[]

    @ApiProperty()
    @IsArray()
    member: string[]

    @ApiProperty()
    @IsString()
    customer: string

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    startDate: Date
}

export class UpdateProjectDto {
    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsString()
    status: string

    @ApiProperty()
    @IsArray()
    technology: string[]

    @ApiProperty()
    @IsArray()
    member: string[]

    @ApiProperty()
    @IsString()
    customer: string
}