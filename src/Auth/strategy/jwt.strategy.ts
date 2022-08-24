import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt,Strategy } from "passport-jwt";
import { AccountRepository } from "src/Api/Account/account.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(private accountRepository: AccountRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'accessKey'
        })
    }

    async validate(payload: {sub: string}) {    
        let account = await this.accountRepository.findOne({username:payload.sub})
        delete account.password
        return account
    }
}