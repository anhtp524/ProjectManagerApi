import { Injectable } from "@nestjs/common";
import { CreateStatusDto, UpdateStatusDto } from "./dto/status.dto";
import { StatusRepository } from "./status.repository";


@Injectable()
export class StatusService {
    constructor(private statusRepo: StatusRepository) {}

    createStatus(newStatus: CreateStatusDto) {
        return this.statusRepo.create(newStatus)
    }

    getAllStatus() {
        return this.statusRepo.getAll()
    }

    getStatusById(id: string) {
        return this.statusRepo.getById(id)
    }

    updateStatus(id: string, updateStatus: UpdateStatusDto) {
        return this.statusRepo.update(id, updateStatus)
    }

    deleteStatus(id: string) {
        return this.statusRepo.delete(id)
    }
}