import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { check } from "prettier";
import { ProjectRepository } from "../Project/project.repository";
import { CreateProjectTypeDto, UpdateProjectTypeDto } from "./dto/typeProject.dto";
import { TypeProject, TypeProjectDocument } from "./typeProject.schema";

@Injectable()
export class TypeProjectRepository {
    constructor(
        @InjectModel(TypeProject.name) private typeProjectModel: Model<TypeProjectDocument>,
        private projectRepo: ProjectRepository) {}
    
    async create(projectype: CreateProjectTypeDto) {
        const newType = new this.typeProjectModel(projectype)
        return newType.save()
    }

    async getAll(limit ?: number, page :number = 1) {
        const totalDocs = await this.typeProjectModel.countDocuments()
        const totalPage = Math.ceil(totalDocs / limit)

        if(limit) {
            if(page <= totalPage) {
                const docsView = await this.typeProjectModel  
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
            return this.typeProjectModel.find()
        }     
    }

    async getById(_id: string) {
        return this.typeProjectModel.findById(_id)
    }

    async update(_id: string,item: UpdateProjectTypeDto) {
        return this.typeProjectModel.findByIdAndUpdate({_id: _id}, {$set: item})
    }

    async delete(_id: string) {
        const findTypeProject = await this.typeProjectModel.find({_id: _id})
        if (findTypeProject && findTypeProject.length !== 0){
            const typeInProject = await this.projectRepo.findOne({type:_id})
            if (!typeInProject || typeInProject.length == 0) {
                await this.typeProjectModel.findByIdAndDelete(_id)
                return "You have successfully deleted"
            }
            else throw new HttpException("You can not delete", HttpStatus.NOT_ACCEPTABLE)
        }
        else throw new HttpException("Not found",HttpStatus.NOT_FOUND)
    }
}