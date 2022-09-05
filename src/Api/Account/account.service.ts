import { ForbiddenException, Injectable } from "@nestjs/common";
import { AccountRepository } from "./account.repository";
import { CreateAccountDto, UpdateAccountDto } from "./dto/account.dto";
import * as bcrypt from "bcrypt"


@Injectable()
export class AccountService {
    constructor(private accountRepo: AccountRepository) {}
 
    async createAccount(newAccount: CreateAccountDto) {
        const checkUsername = await this.accountRepo.findOne({username: newAccount.username})
        //const checkEmail = await this.accountRepo.findOne({email: newAccount.email})
        if (checkUsername) {
            throw new ForbiddenException("username already available")
        }
        newAccount.password =await bcrypt.hash(newAccount.password, 10)
        return this.accountRepo.create(newAccount)
    }

    getAllAccount(limit ?: number, page ?: number) {
        return this.accountRepo.getAll(limit, page)
    }

    getAccountById(id: string) {
        return this.accountRepo.getById(id)
    }

    async updateAccount(id: string, updateAccount: UpdateAccountDto) {
        updateAccount.password = await bcrypt.hash(updateAccount.password, 10)
        return this.accountRepo.update(id, updateAccount)
    }

    deleteAccount(id: string) {
        return this.accountRepo.delete(id)
    }
}