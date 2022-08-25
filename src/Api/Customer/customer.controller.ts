import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto, UpdateCustomerDto } from "./dto/customer.dto";

@Controller('/customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Post()
    createCustomer(@Body() newCustomer: CreateCustomerDto) {
        return this.customerService.createCustomer(newCustomer)
    }

    @Get()
    getAllCustomer(@Query() {limit, page}: {limit: number, page: number}) {
        return this.customerService.getAllCustomer(limit, page)
    }

    @Get('/:id')
    getCustomerById(@Param('id') id: string) {
        return this.customerService.getCustomerById(id)
    }

    @Patch('/:id')
    updateCustomer(@Param('id') id: string, @Body() updateCustomer: UpdateCustomerDto) {
        return this.customerService.updateCustomer(id, updateCustomer)
    }

    @Delete(':id')
    deleteCustomer(@Param('id') id: string) {
        return this.customerService.deleteCustomer(id)
    }
}
