import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountController } from "./account.controller";
import { AccountRepository } from "./account.repository";
import { Account, AccountSchema } from "./account.schema";
import { AccountService } from "./account.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Account.name, schema: AccountSchema}])],
    controllers: [AccountController],
    providers: [AccountRepository, AccountService],
    exports: [AccountRepository]
})
export class AccountModule {}