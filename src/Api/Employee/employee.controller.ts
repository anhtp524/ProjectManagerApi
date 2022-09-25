import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/Auth/guard/role.guard";
import { PaginationDto } from "src/Share/Dtos/pagination.dto";
import { Role } from "../Account/enum/role.enum";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";
import { EmployeeService } from "./employee.service";

@ApiBearerAuth()
@ApiTags("Employee")
@Controller('/employee')
@UseGuards(AuthGuard('jwt'))
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {}

    @Post()
    @UseGuards(new RolesGuard(Role.ADMIN))
    createEmployee(@Body() newEmployee: CreateEmployeeDto) {
        return this.employeeService.createEmployee(newEmployee)
    }

    @ApiQuery({name : "limit", required: false, type: 'integer'})
    @ApiQuery({name : "page", required: false, type: 'integer'})
    @ApiQuery({name : "search", required: false, type: 'string'})
    @Get()
    getAllEmployee(@Query() {limit, page, search}: PaginationDto) {
        return this.employeeService.getAllEmployee(limit, page, search)
    }
    
    @ApiQuery({name : "technology", required: false})
    @ApiQuery({name : "project", required: false})
    @Get('statistical')
    countEmployees(@Query() {technology, project}: {technology ?: string, project ?: string}) {
        return this.employeeService.countEmployees(technology,project)
    }

    @Get('/:id')
    getEmployeeById(@Param('id') id: string) {
        return this.employeeService.getEmployeeById(id)
    }

    @Patch('/:id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    updateEmployee(@Param('id') id: string, @Body() updateEmployee: UpdateEmployeeDto) {
        return this.employeeService.updateEmployee(id, updateEmployee)
    }

    @Delete(':id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    deleteEmployee(@Param('id') id: string) {
        return this.employeeService.deleteEmployee(id)
    }


}
