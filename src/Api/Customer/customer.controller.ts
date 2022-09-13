import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/Auth/guard/role.guard";
import { Role } from "../Account/enum/role.enum";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto, UpdateCustomerDto } from "./dto/customer.dto";

@ApiBearerAuth()
@ApiTags("Customer")
@Controller('/customer')
@UseGuards(AuthGuard('jwt'))
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Post()
    @UseGuards(new RolesGuard(Role.ADMIN))
    createCustomer(@Body() newCustomer: CreateCustomerDto) {
        return this.customerService.createCustomer(newCustomer)
    }
    
    @ApiQuery({name : "limit", required: false})
    @ApiQuery({name : "page", required: false})
    @Get()
    getAllCustomer(@Query() {limit, page}: {limit: number, page: number}) {
        return this.customerService.getAllCustomer(limit, page)
    }

    @Get('/:id')
    getCustomerById(@Param('id') id: string) {
        return this.customerService.getCustomerById(id)
    }

    @Patch('/:id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    updateCustomer(@Param('id') id: string, @Body() updateCustomer: UpdateCustomerDto) {
        return this.customerService.updateCustomer(id, updateCustomer)
    }

    @Delete(':id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    deleteCustomer(@Param('id') id: string) {
        return this.customerService.deleteCustomer(id)
    }
}
