import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStatusDto, UpdateStatusDto } from "./dto/status.dto";
import { StatusDocument, StatusProject } from "./status.schema";



@Injectable()
export class StatusRepository {
    constructor(@InjectModel(StatusProject.name) private statusModel: Model<StatusDocument>) {}
    
    async create(newStatus: CreateStatusDto) {
        const newStatusProject = new this.statusModel(newStatus)
        return newStatusProject.save()
    }

    async getAll() {
        return this.statusModel.find()
    }

    async getById(_id: string) {
        return this.statusModel.findById(_id)
    }

    async update(_id: string,item: UpdateStatusDto) {
        return this.statusModel.findByIdAndUpdate({_id: _id}, item)
    }

    async delete(_id: string) {
        return this.statusModel.findByIdAndDelete(_id)
    }
}