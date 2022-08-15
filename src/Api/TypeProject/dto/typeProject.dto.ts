import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectTypeDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    status: string
}

export class UpdateProjectTypeDto {
    @IsNotEmpty()
    @IsString()
    status: string
}