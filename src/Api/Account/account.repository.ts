import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account, AccountDocument } from "./account.schema";


@Injectable()
export class AccountRepository {
    constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}
    
    async create(newItem: any) {
        const newAccount = new this.accountModel(newItem)
        return await newAccount.save()
    }

    async getAll() {
        return await this.accountModel.find()
    }

    async getById(_id: string) {
        return await this.accountModel.findById(_id)
    }

    async update(_id: string,item: any) {
        return await this.accountModel.findByIdAndUpdate({_id: _id}, item)
    }

    async delete(_id: string) {
        return await this.accountModel.findByIdAndDelete(_id)
    }

    async findOne(condition: any) {
        return await this.accountModel.findOne(condition).lean()
    }
}