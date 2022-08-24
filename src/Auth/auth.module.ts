import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AccountModule } from "src/Api/Account/account.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [AccountModule,JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}