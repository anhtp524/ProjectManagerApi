import { Injectable } from "@nestjs/common";
import { AccountRepository } from "./account.repository";
import { CreateAccountDto, UpdateAccountDto } from "./dto/account.dto";


@Injectable()
export class AccountService {
    constructor(private accountRepo: AccountRepository) {}
 
    createAccount(newAccount: CreateAccountDto) {
        return this.accountRepo.create(newAccount)
    }

    getAllAccount() {
        return this.accountRepo.getAll()
    }

    getAccountById(id: string) {
        return this.accountRepo.getById(id)
    }

    updateAccount(id: string, updateAccount: UpdateAccountDto) {
        return this.accountRepo.update(id, updateAccount)
    }

    deleteAccount(id: string) {
        return this.accountRepo.delete(id)
    }
}