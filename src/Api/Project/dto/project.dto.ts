import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    description: string

    @IsString()
    typeProject: string

    @IsString()
    status: string
    
    @IsArray()
    technology: string[]

    @IsArray()
    member: string[]

    @IsString()
    customer: string

    @IsDate()
    @Type(() => Date)
    startDate: Date
}

export class UpdateProjectDto {

    @IsString()
    description: string

    @IsString()
    status: string

    @IsArray()
    technology: string[]

    @IsArray()
    member: string[]

    @IsString()
    customer: string
}