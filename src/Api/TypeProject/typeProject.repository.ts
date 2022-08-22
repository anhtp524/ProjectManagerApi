import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProjectTypeDto, UpdateProjectTypeDto } from "./dto/typeProject.dto";
import { TypeProject, TypeProjectDocument } from "./typeProject.schema";

@Injectable()
export class TypeProjectRepository {
    constructor(@InjectModel(TypeProject.name) private typeProjectModel: Model<TypeProjectDocument>) {}
    
    async create(projectype: CreateProjectTypeDto) {
        const newType = new this.typeProjectModel(projectype)
        return newType.save()
    }

    async getAll() {
        return this.typeProjectModel.find()
    }

    async getById(_id: string) {
        return this.typeProjectModel.findById(_id)
    }

    async update(_id: string,item: UpdateProjectTypeDto) {
        return this.typeProjectModel.findByIdAndUpdate({_id: _id}, {$set: item})
    }

    async delete(_id: string) {
        return this.typeProjectModel.findByIdAndDelete(_id)
    }
}