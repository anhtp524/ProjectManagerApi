import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto, UpdateCustomerDto } from "./dto/customer.dto";

@Controller('/customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Post()
    createStatus(@Body() newCustomer: CreateCustomerDto) {
        return this.customerService.createCustomer(newCustomer)
    }

    @Get()
    getAllCustomerProject() {
        return this.customerService.getAllCustomer()
    }

    @Get('/:id')
    getCustomerProjectById(@Param('id') id: string) {
        return this.customerService.getCustomerById(id)
    }

    @Patch('/:id')
    updateCustomerProject(@Param('id') id: string, @Body() updateCustomer: UpdateCustomerDto) {
        return this.customerService.updateCustomer(id, updateCustomer)
    }

    @Delete(':id')
    deleteCustomerProject(@Param('id') id: string) {
        return this.customerService.deleteCustomer(id)
    }
}
