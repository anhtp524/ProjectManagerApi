import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";
import { EmployeeService } from "./employee.service";

@Controller('/employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {}

    @Post()
    createEmployee(@Body() newEmployee: CreateEmployeeDto) {
        return this.employeeService.createEmployee(newEmployee)
    }

    @Get()
    getAllEmployee(@Query() {limit, page} : {limit: number, page: number}) {
        return this.employeeService.getAllEmployee(limit, page)
    }

    @Get('/:id')
    getEmployeeById(@Param('id') id: string) {
        return this.employeeService.getEmployeeById(id)
    }

    @Patch('/:id')
    updateEmployee(@Param('id') id: string, @Body() updateEmployee: UpdateEmployeeDto) {
        return this.employeeService.updateEmployee(id, updateEmployee)
    }

    @Delete(':id')
    deleteEmployee(@Param('id') id: string) {
        return this.employeeService.deleteEmployee(id)
    }
}
