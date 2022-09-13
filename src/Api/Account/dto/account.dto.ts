import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../enum/role.enum";

export class CreateAccountDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({enum : Role})
    @IsNotEmpty()
    role: Role

}

export class UpdateAccountDto {
    
    @ApiProperty()
    username?: string

    @ApiProperty()
    password?: string

    @ApiProperty()
    name?: string

    @ApiProperty()
    role?: Role
    
    @ApiProperty()
    refreshToken?: string
}