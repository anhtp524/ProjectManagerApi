import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Repository } from "src/Share/Database/Repository";
import { Team, TeamDocument } from "./team.schema";


@Injectable()
export class TeamRepository extends Repository<TeamDocument> {
    constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {
        super(teamModel)
    }

    async getById(_id: string) {
        return await this.teamModel
                .findById(_id)
                .populate('manager', "name")
                .populate('member', 'name')
                .populate('project', 'name')
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