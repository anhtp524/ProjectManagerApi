import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDto, UpdateAccountDto } from "./dto/account.dto";

@Controller('/account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post()
    createAccout(@Body() newAccount: CreateAccountDto) {
        return this.accountService.createAccount(newAccount)
    }

    @Get()
    getAllAccout() {
        return this.accountService.getAllAccount()
    }

    @Get('/:id')
    getAccountById(@Param('id') id: string) {
        return this.accountService.getAccountById(id)
    }

    @Patch('/:id')
    updateAccout(@Param('id') id: string, @Body() updateCustomer: UpdateAccountDto) {
        return this.accountService.updateAccount(id, updateCustomer)
    }

    @Delete(':id')
    deleteAccount(@Param('id') id: string) {
        return this.accountService.deleteAccount(id)
    }
}
