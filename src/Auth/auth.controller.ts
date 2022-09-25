import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { LogoutDto } from "./dto/logout.dto";
import { RefreshTokenDto } from "./dto/refresh.dto";

@ApiTags("Authentication")
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body() acc: LoginDto) {
        return this.authService.signIn(acc)
    }

    
    @Post('/refresh')
    async refresh(@Body() token: RefreshTokenDto) { 
        return this.authService.signAccessTokenFromRefreshToken(token)
    }

    @ApiBearerAuth()
    @Post('/logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(@Body() {id}: LogoutDto) {
        return this.authService.logOut(id)
      
    }

}