import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    description: string
}

export class UpdateCustomerDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    description: string
}