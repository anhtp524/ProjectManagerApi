import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProjectTypeDto, UpdateProjectTypeDto } from "./dto/typeProject.dto";
import { TypeProject, TypeProjectDocument } from "./typeProject.schema";

@Injectable()
export class TypeProjectRepository {
    constructor(@InjectModel(TypeProject.name) private typeProjectModel: Model<TypeProjectDocument>) {}
    
    async createType(projectype: CreateProjectTypeDto) {
        const newType = new this.typeProjectModel(projectype)
        return newType.save()
    }

    async 
}