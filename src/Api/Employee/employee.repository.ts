import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProjectRepository } from "../Project/project.repository";
import { TeamRepository } from "../Team/team.repository";
import { Employee, EmployeeDocument } from "./employee.schema";

@Injectable()
export class EmployeeRepository {
    constructor(
        @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
        private projectRepo: ProjectRepository,
        private teamRepo: TeamRepository
        ) {}
    
    async create(newItem: any) {
        const newEmployee = new this.employeeModel(newItem)
        return newEmployee.save()
    }

    async getAll(limit ?: number, page :number = 1) {
        const totalDocs = await this.employeeModel.countDocuments()
        const totalPage = Math.ceil(totalDocs / limit)
        if(!limit) return this.employeeModel.find().populate("technology", "name")
        if(page > totalPage) throw new HttpException("Page is not exist", HttpStatus.NOT_FOUND)
        const docsView = await this.employeeModel  
                                    .find({})
                                    .skip((page - 1) * limit) 
                                    .limit(limit)
                                    .populate("technology", "name")
        return {
                currentPage: page,
                totalPage: totalPage,
                data: docsView
        }
    }

    async getById(_id: string) {
        return this.employeeModel.findById(_id).populate('technology', 'name')
    }

    async update(_id: string,item: any) {
        return this.employeeModel.findByIdAndUpdate({_id: _id}, {$set:item})
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

    async countEmployee(technology ?: string) {
        let filter = {technology: technology}
        try {
            let query = {}
            for (let [key,value] of Object.entries(filter)) {
                if (value) {
                    query[key] = value
                }
            }
            
            const numberProject = await this.employeeModel.countDocuments(query)
                return {
                    filter: query,
                    amount : numberProject
                }
        }
        catch(err) {
            return new HttpException("Not count", HttpStatus.NOT_FOUND)
        }
    }
}