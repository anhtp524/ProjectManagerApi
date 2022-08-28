import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TeamModule } from "../Team/team.module";
import { ProjectController } from "./project.controller";
import { ProjectRepository } from "./project.repository";
import { Project, ProjectSchema } from "./project.schema";
import { ProjectService } from "./project.service";
@Module({
    imports: [
        MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}]),
        TeamModule
    ],
    controllers: [ProjectController],
    providers: [ProjectRepository, ProjectService],
    exports: [ProjectRepository]
})
export class ProjectModule {}