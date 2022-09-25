import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string
}