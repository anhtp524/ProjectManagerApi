import { Injectable } from "@nestjs/common";
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

    async getAll() {
        return this.projectModel
                .find({})
                .populate('typeProject' ,'name')
                .populate('status', 'name')
                .populate('technology', 'name')
                .populate('member')
                .populate('customer', 'name')
                .exec()
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