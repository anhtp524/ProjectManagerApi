import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh.dto";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body() acc: LoginDto) {
        return this.authService.signIn(acc)
    }

    @Post('/refresh')
    async refresh(@Body() token: any) { 
        return this.authService.signAccessTokenFromRefreshToken(token)
    }

    // @Post('/logout')
    // async logout(@Body() id: string) { 
    //     return this.authService.logOut(id)
    // }

}