import { Injectable } from "@nestjs/common";
import { CreateTechnologyDto, UpdateTechnologyDto } from "./dto/technology.dto";
import { TechnologyRepository } from "./technology.repository";


@Injectable()
export class TechnologyService {
    constructor(private technologyRepo: TechnologyRepository) {}

    createTechnology(newTech: CreateTechnologyDto) {
        return this.technologyRepo.create(newTech)
    }

    getAllTechnology() {
        return this.technologyRepo.getAll()
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