import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectModule } from "../Project/project.module";
import { TypeProjectController } from "./typeProject.controller";
import { TypeProjectRepository } from "./typeProject.repository";
import { TypeProject, TypeProjectSchema } from "./typeProject.schema";
import { TypeProjectService } from "./typeProject.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: TypeProject.name, schema: TypeProjectSchema}]), 
        ProjectModule
    ],
    controllers: [TypeProjectController],
    providers: [TypeProjectRepository, TypeProjectService],
    exports: []
})
export class TypeProjectModule{}