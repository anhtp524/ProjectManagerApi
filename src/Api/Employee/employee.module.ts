import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectModule } from "../Project/project.module";
import { TeamModule } from "../Team/team.module";
import { EmployeeController } from "./employee.controller";
import { EmployeeRepository } from "./employee.repository";
import { Employee, EmployeeSchema } from "./employee.schema";
import { EmployeeService } from "./employee.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Employee.name, schema: EmployeeSchema}]),
        ProjectModule,
        TeamModule
    ],
    controllers: [EmployeeController],
    providers: [EmployeeRepository, EmployeeService],
    exports: [EmployeeRepository]
})
export class EmployeeModule {}