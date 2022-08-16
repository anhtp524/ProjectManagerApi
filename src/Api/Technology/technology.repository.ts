import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTechnologyDto, UpdateTechnologyDto } from "./dto/technology.dto";
import { Technology, TechnologyDocument } from "./technology.schema";

@Injectable()
export class TechnologyRepository {
    constructor(@InjectModel(Technology.name) private technologyModel: Model<TechnologyDocument>) {}
    
    async create(newTechnology: CreateTechnologyDto) {
        const newTechnologyProject = new this.technologyModel(newTechnology)
        return newTechnologyProject.save()
    }

    async getAll() {
        return this.technologyModel.find()
    }

    async getById(_id: string) {
        return this.technologyModel.findById(_id)
    }

    async update(_id: string,item: UpdateTechnologyDto) {
        return this.technologyModel.findByIdAndUpdate({_id: _id}, item)
    }

    async delete(_id: string) {
        return this.technologyModel.findByIdAndDelete(_id)
    }
}