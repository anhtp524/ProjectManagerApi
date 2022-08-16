import { Injectable } from "@nestjs/common";
import { CreateStatusDto, UpdateStatusDto } from "./dto/status.dto";
import { StatusRepository } from "./status.repository";


@Injectable()
export class StatusService {
    constructor(private statusRepo: StatusRepository) {}

    createType(newStatus: CreateStatusDto) {
        return this.statusRepo.create(newStatus)
    }

    getAllType() {
        return this.statusRepo.getAll()
    }

    getTypeById(id: string) {
        return this.statusRepo.getById(id)
    }

    updateType(id: string, updateStatus: UpdateStatusDto) {
        return this.statusRepo.update(id, updateStatus)
    }

    deleteType(id: string) {
        return this.statusRepo.delete(id)
    }
}