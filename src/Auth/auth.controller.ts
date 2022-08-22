import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller('/login')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async login(@Body() acc: LoginDto) {
        return this.authService.signIn(acc)
    }
}