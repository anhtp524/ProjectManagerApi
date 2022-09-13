import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
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

    @Post('/logout')
    async logout(@Body() {id}: LogoutDto) { 
        console.log(id);
        
        return this.authService.logOut(id)
      
    }

}