import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
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
    getAllEmployeeProject() {
        return this.employeeService.getAllEmployee()
    }

    @Get('/:id')
    getEmployeeProjectById(@Param('id') id: string) {
        return this.employeeService.getEmployeeById(id)
    }

    @Patch('/:id')
    updateEmployeeProject(@Param('id') id: string, @Body() updateEmployee: UpdateEmployeeDto) {
        return this.employeeService.updateEmployee(id, updateEmployee)
    }

    @Delete(':id')
    deleteEmployeeProject(@Param('id') id: string) {
        return this.employeeService.deleteEmployee(id)
    }
}
