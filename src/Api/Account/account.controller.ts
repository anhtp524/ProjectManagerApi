import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger";
import { SanitizeMongooseModelInterceptor } from "nestjs-mongoose-exclude";
import { RolesGuard } from "src/Auth/guard/role.guard";
import { CloudinaryService } from "src/Share/Cloudinary/cloudinary.service";
import { PaginationDto } from "src/Share/Dtos/pagination.dto";
import { Account } from "./account.schema";
import { AccountService } from "./account.service";
import { CreateAccountDto, UpdateAccountDto } from "./dto/account.dto";
import { Role } from "./enum/role.enum";


@ApiBearerAuth()
@ApiTags("Account")
@Controller('/account')
@UseGuards(AuthGuard('jwt'), new RolesGuard(Role.ADMIN))
export class AccountController {
    constructor(private accountService: AccountService, private cloudService: CloudinaryService) {}

    
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateAccountDto})
    @Post()
    @UseInterceptors(FileInterceptor('avatarUrl'))
    async createAccout(@Body() newAccount: CreateAccountDto, @UploadedFile() avatar : Express.Multer.File) {
        if(avatar) {
            const result = await this.cloudService.uploadImageToCloudinary(avatar)
            newAccount.avatarUrl = result.url
        }
        else {
            newAccount.avatarUrl = ''
        }
        // const result = await this.cloudService.uploadImageToCloudinary(avatar)
        // newAccount.avatarUrl = result.url
        return this.accountService.createAccount(newAccount)
    }


    @ApiQuery({name : "limit", required: false, type: 'integer'})
    @ApiQuery({name : "page", required: false, type: 'integer'})
    @ApiQuery({name : "search", required: false, type: 'string'})
    @UseInterceptors(new SanitizeMongooseModelInterceptor({excludeMongooseId: false, excludeMongooseV: true}))
    @Get()
    getAllAccout(@Query() {limit, page, search}: PaginationDto) {
        return this.accountService.getAllAccount(limit, page, search)
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

    @ApiConsumes('multipart/form-data')
    @ApiBody({type: UpdateAccountDto})
    @Patch('/:id')
    async updateAccout(@Param('id') id: string, @Body() updateCustomer: UpdateAccountDto) {
        return await this.accountService.updateAccount(id, updateCustomer)
    }

    @Delete(':id')
    deleteAccount(@Param('id') id: string) {
        return this.accountService.deleteAccount(id)
    }
}
