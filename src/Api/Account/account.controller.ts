import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SanitizeMongooseModelInterceptor } from "nestjs-mongoose-exclude";
import { RolesGuard } from "src/Auth/guard/role.guard";
import { Account } from "./account.schema";
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

    @UseInterceptors(new SanitizeMongooseModelInterceptor({excludeMongooseId: false, excludeMongooseV: true}))
    @Get()
    getAllAccout(@Query() {limit, page}: {limit: number, page: number}) {
        return this.accountService.getAllAccount(limit,page)
    }

    @Get('/infor')
    getInfor(@Req() req) {
        return req.user
    }

    @UseInterceptors(new SanitizeMongooseModelInterceptor({excludeMongooseId: false, excludeMongooseV: true}))
    @Get('/:id')
    async getAccountById(@Param('id') id: string): Promise<Account> {
        return await this.accountService.getAccountById(id)
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
