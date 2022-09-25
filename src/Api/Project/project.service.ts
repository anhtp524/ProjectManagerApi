import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";
import { CreateProjectDto, UpdateProjectDto } from "./dto/project.dto";
import { ProjectRepository } from "./project.repository";
import { ProjectDocument } from "./project.schema";

@Injectable()
export class ProjectService {
    constructor(private projectRepo: ProjectRepository) {}

    createProject(newProjectDto: CreateProjectDto) {
        const typeProjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(newProjectDto.typeProject)
        const statusId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(newProjectDto.status)
        const techId: mongoose.Types.ObjectId[] = newProjectDto.technology.map(
            (value,index) => {
                return new mongoose.Types.ObjectId(value)
        })
        const memberId: mongoose.Types.ObjectId[] = newProjectDto.member.map(
            (value,index) => {
                return new mongoose.Types.ObjectId(value)
        }) 
        const customerId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(newProjectDto.customer)

        let {typeProject,status,technology,member,customer, ...rest} = newProjectDto
        const newProject = {
            ...rest, 
            typeProject: typeProjectId,
            status: statusId,
            technology: techId,
            member: memberId,
            customer: customerId
        }        

        return this.projectRepo.create(<ProjectDocument>newProject)
    }

    getAllProject(limit ?: number, page ?: number, search ?: string) {
        return this.projectRepo.getAll(limit, page, search)
    }

    getProjectById(id: string) {
        return this.projectRepo.getById(id)
    }

    updateProject(id: string, updateProject: UpdateProjectDto) {
        const statusId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(updateProject.status)
        const techId: mongoose.Types.ObjectId[] = updateProject.technology.map(
            (value, index) => {
                return new mongoose.Types.ObjectId(value)
            }
        )
        const memberId: mongoose.Types.ObjectId[] = updateProject.member.map(
            (value, index) => {
                return new mongoose.Types.ObjectId(value)
            }
        )
        const customerId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(updateProject.customer)
        let {status,technology,member, customer, ...rest} = updateProject
        const newUpdate = {
            ... rest, 
            status:  statusId,
            technology: techId,
            member: memberId,
            customer: customerId
        }
        return this.projectRepo.update(id, newUpdate )
    }

    deleteProject(id: string) {
        return this.projectRepo.delete(id)
    }

    getMember(nameProject: string) {
        return this.projectRepo.getMemberInProject(nameProject)
    }

    countProjects(status ?: string, type ?: string, technology ?: string, customer ?: string, date ?: string) {
        return this.projectRepo.countProjectWithCondition(status, type, technology, customer, date)
    }
}