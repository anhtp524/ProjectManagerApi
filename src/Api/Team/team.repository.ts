import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Team, TeamDocument } from "./team.schema";


@Injectable()
export class TeamRepository {
    constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {}
    
    async create(newItem: any) {
        const newTeam = new this.teamModel(newItem)
        return await newTeam.save()
    }

    async getAll(limit ?: number, page :number = 1) {
        const totalDocs = await this.teamModel.countDocuments()
        const totalPage = Math.ceil(totalDocs / limit)

        if(limit) {
            if(page <= totalPage) {
                const docsView = await this.teamModel  
                                    .find({})
                                    .skip((page - 1) * limit) 
                                    .limit(limit)
                                    .populate('manager', "name")
                                    .populate('member', 'name')
                                    .populate('project', 'name')
                return {
                    currentPage: page,
                    totalPage: totalPage,
                    data: docsView
                }
            }
            else throw new HttpException("Page is not exis", HttpStatus.NOT_FOUND)
        }
        else {
            return this.teamModel.find({})
                                .populate('manager', "name")
                                .populate('member', 'name')
                                .populate('project', 'name')
        }     
    }

    async getById(_id: string) {
        return await this.teamModel
                .findById(_id)
                .populate('manager', "name")
                .populate('member', 'name')
                .populate('project', 'name')
    }

    async update(_id: string,item: any) {
        return await this.teamModel.findByIdAndUpdate(_id, item).exec()
    }

    async delete(_id: string) {
        return await this.teamModel.findByIdAndDelete(_id)
    }

    async findOne(condition: any) {
        return await this.teamModel.find(condition)
    }

    async getMemberInTeam(nameTeam: string) {
        return this.teamModel.find({name: nameTeam}, ["member", "name"]).populate('member', 'name')
    }

    async getProjectInTeam(nameTeam: string) {
        return this.teamModel.find({name: nameTeam}, ["project","name"]).populate({path: 'project', select: ['name', 'description']})
    }
}