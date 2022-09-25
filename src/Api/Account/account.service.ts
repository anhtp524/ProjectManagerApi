import { ForbiddenException, Injectable } from "@nestjs/common";
import { AccountRepository } from "./account.repository";
import { CreateAccountDto, UpdateAccountDto } from "./dto/account.dto";
import * as bcrypt from "bcrypt"
import { AccountDocument } from "./account.schema";


@Injectable()
export class AccountService {
    constructor(private accountRepo: AccountRepository) {}
 
    async createAccount(newAccount: CreateAccountDto) {
        const checkUsername = await this.accountRepo.getOne({username: newAccount.username})
        if (checkUsername) {
            throw new ForbiddenException("username already available")
        }
        
        newAccount.password =await bcrypt.hash(newAccount.password, 10)
        return this.accountRepo.create(<AccountDocument>newAccount)
    }

    getAllAccount(limit ?: number, page ?: number, search ?: string) {
        return this.accountRepo.getAll(limit, page, search)
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