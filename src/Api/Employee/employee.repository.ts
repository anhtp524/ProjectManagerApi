import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Repository } from "src/Share/Database/Repository";
import { ProjectRepository } from "../Project/project.repository";
import { TeamRepository } from "../Team/team.repository";
import { Employee, EmployeeDocument } from "./employee.schema";

@Injectable()
export class EmployeeRepository extends Repository<EmployeeDocument> {
    constructor(
        @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
        private projectRepo: ProjectRepository,
        private teamRepo: TeamRepository
        ) {
            super(employeeModel)
        }

    async getById(_id: string) {
        return this.employeeModel.findById(_id).populate('technology', 'name')
    }

    async delete(_id: string) {
        const findEmployee = await this.employeeModel.find({_id: _id})
        if (!findEmployee || findEmployee.length === 0) throw new HttpException("Not found",HttpStatus.NOT_FOUND)
        const employeeInProject = await this.projectRepo.findOne({member:_id})
        const employeeInTeam = await this.teamRepo.findOne({member:_id})
        if ((employeeInProject && employeeInProject.length !== 0) || 
            (employeeInTeam && employeeInTeam.length !== 0)) throw new HttpException("You can not delete", HttpStatus.NOT_ACCEPTABLE)
        await this.employeeModel.findByIdAndDelete(_id)
        return "You have successfully deleted"
    }

    async findOne(condition: any) {
        return this.employeeModel.find(condition)
    }

    async countEmployee(technology ?: string, project ?: string) {
        if (project) {
            const dataOfQuery = await this.projectRepo.findMember(project,technology)
            return {
                amount: dataOfQuery.length,
                data: dataOfQuery
            }
        }

        if (technology) {
            const dataOfQuery = await this.employeeModel.find({technology: technology})
            return {
                amount: dataOfQuery.length,
                data: dataOfQuery
            }
        }

        return await this.employeeModel.find().populate("technology", "name")
    }
}