import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../enum/role.enum";

export class CreateAccountDto {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    role: Role

}

export class UpdateAccountDto {
    
    username?: string

    
    password?: string

    
    name?: string

   
    role?: Role

    refreshToken?: string
}