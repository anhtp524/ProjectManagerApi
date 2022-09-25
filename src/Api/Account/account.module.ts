import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CloudinaryModule } from "src/Share/Cloudinary/cloudinary.module";
import { AccountController } from "./account.controller";
import { AccountRepository } from "./account.repository";
import { Account, AccountSchema } from "./account.schema";
import { AccountService } from "./account.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Account.name, schema: AccountSchema}]), CloudinaryModule],
    controllers: [AccountController],
    providers: [AccountRepository, AccountService],
    exports: [AccountRepository]
})
export class AccountModule {}