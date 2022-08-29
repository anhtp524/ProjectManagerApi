import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TeamRepository } from "../Team/team.repository";
import { Project, ProjectDocument } from "./project.schema";
;

@Injectable()
export class ProjectRepository {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
        private teamRepo: TeamRepository) {}
    
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
                                    .populate('member', 'name')
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
                                    .populate('member', 'name')
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
                .populate('member','name')
                .populate('customer', 'name')
    }

    async findOne(condition: any) {
        return await this.projectModel.find(condition)
    }

    async update(_id: string,item: any) {
        return this.projectModel.findByIdAndUpdate({_id: _id}, {$set:item})
    }

    async delete(_id: string) {
        const findProject = await this.projectModel.find({_id: _id})
        if (findProject && findProject.length !== 0){
            const projectInTeam = await this.teamRepo.findOne({project: _id})
            if (!projectInTeam || projectInTeam.length == 0) {
                await this.projectModel.findByIdAndDelete(_id)
                return "You have successfully deleted"
            }
            else throw new HttpException("You can not delete", HttpStatus.NOT_ACCEPTABLE)
        }
        else throw new HttpException("Not found",HttpStatus.NOT_FOUND)
    }

    async getMemberInProject(nameProject: string) {
        return this.projectModel.find({name: nameProject}, "member").populate('member', 'name')
    }
}