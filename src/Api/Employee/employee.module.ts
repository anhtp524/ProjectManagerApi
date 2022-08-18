import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeController } from "./employee.controller";
import { EmployeeRepository } from "./employee.repository";
import { Employee, EmployeeSchema } from "./employee.schema";
import { EmployeeService } from "./employee.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Employee.name, schema: EmployeeSchema}])],
    controllers: [EmployeeController],
    providers: [EmployeeRepository, EmployeeService],
})
export class EmployeeModule {}