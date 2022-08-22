import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountRepository } from "src/Api/Account/account.repository";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private accountRepo: AccountRepository, private jwtService: JwtService) {}

    async signIn(acc: LoginDto) {
        const account = await this.accountRepo.findOne({username: acc.username})
        if(!account) throw new UnauthorizedException("Account does not exist");
        const checkPassword = await bcrypt.compare(acc.password, account.password)
        if(!checkPassword) throw new UnauthorizedException("Password is wrong");
        return this.signToken(acc)
    }

    async signToken(acc: LoginDto) {
        const payload = {sub: acc.username}

        const token =  await this.jwtService.sign(payload, {secret: "superKey", expiresIn: "5m"})
        return {
            accessToken: token
        }
    }
}