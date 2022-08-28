import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmployeeRepository } from "../Employee/employee.repository";
import { ProjectRepository } from "../Project/project.repository";
import { CreateTechnologyDto, UpdateTechnologyDto } from "./dto/technology.dto";
import { Technology, TechnologyDocument } from "./technology.schema";

@Injectable()
export class TechnologyRepository {
    constructor(
        @InjectModel(Technology.name) private technologyModel: Model<TechnologyDocument>,
        private projectRepo: ProjectRepository,
        private employeeRepo: EmployeeRepository    
    ) {}
    
    async create(newTechnology: CreateTechnologyDto) {
        const newTechnologyProject = new this.technologyModel(newTechnology)
        return newTechnologyProject.save()
    }

    async getAll(limit ?: number, page :number = 1) {
        const totalDocs = await this.technologyModel.countDocuments()
        const totalPage = Math.ceil(totalDocs / limit)

        if(limit) {
            if(page <= totalPage) {
                const docsView = await this.technologyModel  
                                    .find({})
                                    .skip((page - 1) * limit) 
                                    .limit(limit)
                return {
                    currentPage: page,
                    totalPage: totalPage,
                    data: docsView
                }
            }
            else throw new HttpException("Page is not exis", HttpStatus.NOT_FOUND)
        }
        else {
            return this.technologyModel.find()
        }     
    }

    async getById(_id: string) {
        return this.technologyModel.findById(_id)
    }

    async update(_id: string,item: UpdateTechnologyDto) {
        return this.technologyModel.findByIdAndUpdate({_id: _id}, item)
    }

    async delete(_id: string) {
        const findTech = await this.technologyModel.find({_id: _id})
        if (findTech){
            const techInProject = await this.projectRepo.findOne({technology:_id})
            const techInEmployee = await this.employeeRepo.findOne({technology:_id})
            if ((!techInProject || techInProject.length == 0) && (!techInEmployee || techInEmployee.length == 0)) {
                await this.technologyModel.findByIdAndDelete(_id)
                return "You have successfully deleted"
            }
            else throw new HttpException("You can not delete", HttpStatus.NOT_ACCEPTABLE)
        }
        else throw new HttpException("Not found",HttpStatus.NOT_FOUND)
    }
}