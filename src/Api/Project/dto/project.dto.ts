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

    @IsString()
    @IsArray()
    technology: string[]

    @IsString()
    @IsArray()
    member: string[]

    @IsString()
    customer: string

    @IsDate()
    startDate: Date
}

export class UpdateProjectDto {

    @IsString()
    description: string

    @IsString()
    status: string

    @IsString()
    @IsArray()
    technology: string[]

    @IsString()
    @IsArray()
    member: string[]

    @IsString()
    customer: string
}