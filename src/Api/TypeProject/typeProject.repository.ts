import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Repository } from "src/Share/Database/Repository";
import { ProjectRepository } from "../Project/project.repository";
import { TypeProject, TypeProjectDocument } from "./typeProject.schema";

@Injectable()
export class TypeProjectRepository extends Repository<TypeProjectDocument> {
    constructor(
        @InjectModel(TypeProject.name) private typeProjectModel: Model<TypeProjectDocument>,
        private projectRepo: ProjectRepository) {
            super(typeProjectModel)
        }

    async delete(_id: string) {
        const findTypeProject = await this.typeProjectModel.find({_id: _id})
        if(!findTypeProject || findTypeProject.length === 0) throw new HttpException("Not found",HttpStatus.NOT_FOUND)
        const typeInProject = await this.projectRepo.findOne({type:_id})
        if (typeInProject && typeInProject.length !== 0) throw new HttpException("You can not delete", HttpStatus.NOT_ACCEPTABLE)
        await this.typeProjectModel.findByIdAndDelete(_id)
        return "You have successfully deleted"
    }
}