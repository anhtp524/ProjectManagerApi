import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountRepository } from "src/Api/Account/account.repository";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt"
import { Account } from "src/Api/Account/account.schema";
import { RefreshTokenDto } from "./dto/refresh.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private accountRepo: AccountRepository, 
        private jwtService: JwtService,
        private configService: ConfigService) {}

    async signIn(acc: LoginDto) {
        const account = await this.accountRepo.getOne({username: acc.username})
        if(!account) throw new UnauthorizedException("Account does not exist");
        const checkPassword = await bcrypt.compare(acc.password, account.password)
        if(!checkPassword) throw new UnauthorizedException("Password is wrong");

        const accessKey = this.configService.get("accessTokenKey")
        const refreshKey = this.configService.get("refreshTokenKey")
        const accessToken = await this.signToken(account, accessKey, "15m")
        const refreshToken = await  this.signToken(account, refreshKey, "2592000s")
        const encodeRT = await bcrypt.hash(refreshToken,10)
        await this.accountRepo.update(account._id, {refreshToken: encodeRT})
       
        return {
            id: account._id,
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

    async signAccessTokenFromRefreshToken(item: RefreshTokenDto) {
        const {token, username} = item     
        try {
            const account = await this.accountRepo.getOne({username: username})
            if(!account) throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
            const checkRT = await bcrypt.compare(token, account.refreshToken)
            if (!checkRT || account.refreshToken === null) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

            const payload = await this.jwtService.verify(token, {secret: this.configService.get("refreshTokenKey")})
            if(!payload) throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
            const newAccessToken = this.jwtService.sign({sub: payload.sub}, {secret: "accessKey", expiresIn: "15m"})
            return {
                new_accsessToken: newAccessToken
            }
        }
        catch(err) {
            return err
        }
    }

    async logOut(id: string) {
        await this.accountRepo.update(id, {refreshToken: null})
        return "Logout Success"
    }
}   