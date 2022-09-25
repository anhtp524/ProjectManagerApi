import { Injectable } from "@nestjs/common";
import { CreateProjectTypeDto, UpdateProjectTypeDto } from "./dto/typeProject.dto";
import { TypeProjectRepository } from "./typeProject.repository";
import { TypeProjectDocument } from "./typeProject.schema";

@Injectable()
export class TypeProjectService {
    constructor(private typeProjectRepo: TypeProjectRepository) {}

    createType(newType: CreateProjectTypeDto) {
        return this.typeProjectRepo.create(<TypeProjectDocument>newType)
    }

    getAllType(limit ?: number, page ?: number, search ?: string) {
        return this.typeProjectRepo.getAll(limit, page, search)
    }

    getTypeById(id: string) {
        return this.typeProjectRepo.getById(id)
    }

    updateType(id: string, updateProject: UpdateProjectTypeDto) {
        return this.typeProjectRepo.update(id, updateProject)
    }

    deleteType(id: string) {
        return this.typeProjectRepo.delete(id)
    }
}