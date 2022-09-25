import { Injectable } from "@nestjs/common";
import { CreateTechnologyDto, UpdateTechnologyDto } from "./dto/technology.dto";
import { TechnologyRepository } from "./technology.repository";
import { TechnologyDocument } from "./technology.schema";


@Injectable()
export class TechnologyService {
    constructor(private technologyRepo: TechnologyRepository) {}

    createTechnology(newTech: CreateTechnologyDto) {
        return this.technologyRepo.create(<TechnologyDocument>newTech)
    }

    getAllTechnology(limit ?: number, page ?: number, search ?: string) {
        return this.technologyRepo.getAll(limit, page, search)
    }

    getTechnologyById(id: string) {
        return this.technologyRepo.getById(id)
    }

    updateTechnology(id: string, updateTech: UpdateTechnologyDto) {
        return this.technologyRepo.update(id, updateTech)
    }

    deleteTechnology(id: string) {
        return this.technologyRepo.delete(id)
    }
}