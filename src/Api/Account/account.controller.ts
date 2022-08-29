import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/Auth/guard/role.guard";
import { AccountService } from "./account.service";
import { CreateAccountDto, UpdateAccountDto } from "./dto/account.dto";
import { Role } from "./enum/role.enum";

@Controller('/account')
@UseGuards(AuthGuard('jwt'), new RolesGuard(Role.ADMIN))
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post()
    createAccout(@Body() newAccount: CreateAccountDto) {
        return this.accountService.createAccount(newAccount)
    }

    //@UseInterceptors(Inter)
    
    @Get()
    getAllAccout() {
        return this.accountService.getAllAccount()
    }

    @Get('/infor')
    getInfor(@Req() req) {
        return req.user
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
