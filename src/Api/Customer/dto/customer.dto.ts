import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    description: string
}

export class UpdateCustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    description: string
}