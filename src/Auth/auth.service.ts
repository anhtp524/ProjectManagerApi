import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountRepository } from "src/Api/Account/account.repository";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt"
import { Account } from "src/Api/Account/account.schema";
import { RefreshTokenDto } from "./dto/refresh.dto";

@Injectable()
export class AuthService {
    constructor(private accountRepo: AccountRepository, private jwtService: JwtService) {}

    async signIn(acc: LoginDto) {
        const account = await this.accountRepo.findOne({username: acc.username})
        //console.log(account);
        
        if(!account) throw new UnauthorizedException("Account does not exist");
        const checkPassword = await bcrypt.compare(acc.password, account.password)
        if(!checkPassword) throw new UnauthorizedException("Password is wrong");
        const accessToken = await this.signToken(account, "accessKey", "5m")
        const refreshToken = await  this.signToken(account, "refreshKey", "2592000s")
        await this.accountRepo.update(account._id, {refreshToken: refreshToken})
        return {
            username: account.username,
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    async signToken(acc: Account, key: string, time: string) {
        const payload = {sub: acc.username}

        const token =  await this.jwtService.sign(payload, {secret: key, expiresIn: time})
        return token
    }

    async signAccessTokenFromRefreshToken(item: any) {
        const {token, username} = item     
        try {
            const account = await this.accountRepo.findOne({username: username})
            if(!account) throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
            if (account.refreshToken !== token) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

            const payload = await this.jwtService.verify(token, {secret: "refreshKey"})
            if(!payload) throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
            const newAccessToken = this.jwtService.sign({sub: payload.sub}, {secret: "accessKey", expiresIn: "5m"})
            return {
                new_accsessToken: newAccessToken
            }
        }
        catch(err) {
            return err
        }
    }

    // async logOut(id: string) {
    //     await this.accountRepo.update(id, {refreshToken: null})
    //     return "Logout Success"
    // }
}   