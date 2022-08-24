import { Injectable } from "@nestjs/common";
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

    async getAll() {
        return await this.teamModel
                .find({})
                .populate('manager', "name")
                .populate('member', 'name')
                .populate('project', 'name')
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
        return await this.teamModel.findOne(condition)
    }
}