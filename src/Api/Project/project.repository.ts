import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project, ProjectDocument } from "./project.schema";
;

@Injectable()
export class ProjectRepository {
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}
    
    async create(newItem: any) {
        const newProject = new this.projectModel(newItem)
        return newProject.save()
    }

    async getAll(limit ?: number, page :number = 1) {
        const totalDocs = await this.projectModel.countDocuments()
        const totalPage = Math.ceil(totalDocs / limit)

        if(limit) {
            if(page <= totalPage) {
                const docsView = await this.projectModel  
                                    .find({})
                                    .skip((page - 1) * limit) 
                                    .limit(limit)
                                    .populate('typeProject' ,'name')
                                    .populate('status', 'name')
                                    .populate('technology', 'name')
                                    .populate('member')
                                    .populate('customer', 'name')
                                    .exec()
                return {
                    currentPage: page,
                    totalPage: totalPage,
                    data: docsView
                }
            }
            else throw new HttpException("Page is not exis", HttpStatus.NOT_FOUND)
        }
        else {
            return await this.projectModel.find({})
                                    .populate('typeProject' ,'name')
                                    .populate('status', 'name')
                                    .populate('technology', 'name')
                                    .populate('member')
                                    .populate('customer', 'name')
                                    .exec()
        }     
    }

    async getById(_id: string) {
        return this.projectModel
                .findById(_id)
                .populate('typeProject' ,'name')
                .populate('status', 'name')
                .populate('technology', 'name')
                .populate('member')
                .populate('customer', 'name')
    }

    async update(_id: string,item: any) {
        return this.projectModel.findByIdAndUpdate({_id: _id}, {$set:item})
    }

    async delete(_id: string) {
        return this.projectModel.findByIdAndDelete(_id)
    }
}