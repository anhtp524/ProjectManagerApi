import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProjectRepository } from "../Project/project.repository";
import { CreateStatusDto, UpdateStatusDto } from "./dto/status.dto";
import { StatusDocument, StatusProject } from "./status.schema";

@Injectable()
export class StatusRepository {
    constructor(
        @InjectModel(StatusProject.name) private statusModel: Model<StatusDocument>,
        private projectRepo: ProjectRepository
    ) {}
    
    async create(newStatus: CreateStatusDto) {
        const newStatusProject = new this.statusModel(newStatus)
        return newStatusProject.save()
    }

    async getAll(limit ?: number, page :number = 1) {
        const totalDocs = await this.statusModel.countDocuments()
        const totalPage = Math.ceil(totalDocs / limit)
        if(!limit) return this.statusModel.find()
        if(page > totalPage) throw new HttpException("Page is not exis", HttpStatus.NOT_FOUND)
        const docsView = await this.statusModel  
                                    .find({})
                                    .skip((page - 1) * limit) 
                                    .limit(limit)
        return {
                currentPage: page,
                totalPage: totalPage,
                data: docsView
            }
    }

    async getById(_id: string) {
        return this.statusModel.findById(_id)
    }

    async update(_id: string,item: UpdateStatusDto) {
        return this.statusModel.findByIdAndUpdate({_id: _id}, item)
    }

    async delete(_id: string) {
        const findStatusProject = await this.statusModel.find({_id: _id})
        if (!findStatusProject || findStatusProject.length === 0) throw new HttpException("Not found",HttpStatus.NOT_FOUND)
        const statusInProject = await this.projectRepo.findOne({type:_id}) 
        if (statusInProject && statusInProject.length !== 0) throw new HttpException("You can not delete", HttpStatus.NOT_ACCEPTABLE)
        await this.statusModel.findByIdAndDelete(_id)
        return "You have successfully deleted"
    }
}