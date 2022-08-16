import { Injectable } from "@nestjs/common";
import { CreateTechnologyDto, UpdateTechnologyDto } from "./dto/technology.dto";
import { TechnologyRepository } from "./technology.repository";


@Injectable()
export class TechnologyService {
    constructor(private technologyRepo: TechnologyRepository) {}

    createType(newTech: CreateTechnologyDto) {
        return this.technologyRepo.create(newTech)
    }

    getAllType() {
        return this.technologyRepo.getAll()
    }

    getTypeById(id: string) {
        return this.technologyRepo.getById(id)
    }

    updateType(id: string, updateTech: UpdateTechnologyDto) {
        return this.technologyRepo.update(id, updateTech)
    }

    deleteType(id: string) {
        return this.technologyRepo.delete(id)
    }
}