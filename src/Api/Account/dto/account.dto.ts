import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
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

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: 'string',
    })
    avatarUrl: string

}

export class UpdateAccountDto {
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    username: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    password: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({enum: Role})
    @IsOptional()
    role: Role
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    refreshToken: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: 'string',
        format: 'binary',
    })
    avatarUrl: string;
}