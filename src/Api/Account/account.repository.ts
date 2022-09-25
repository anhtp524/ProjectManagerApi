import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Repository } from "src/Share/Database/Repository";
import { Account, AccountDocument } from "./account.schema";


@Injectable()
export class AccountRepository extends Repository<AccountDocument> {
    constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {
        super(accountModel)
    }

}