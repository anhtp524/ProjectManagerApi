import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Repository } from "src/Share/Database/Repository";
import { ProjectRepository } from "../Project/project.repository";
import { CreateStatusDto, UpdateStatusDto } from "./dto/status.dto";
import { StatusDocument, StatusProject } from "./status.schema";

@Injectable()
export class StatusRepository extends Repository<StatusDocument> {
    constructor(
        @InjectModel(StatusProject.name) private statusModel: Model<StatusDocument>,
        private projectRepo: ProjectRepository
    ) {
        super(statusModel)
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