import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeProjectController } from "./typeProject.controller";
import { TypeProjectRepository } from "./typeProject.repository";
import { TypeProject, TypeProjectSchema } from "./typeProject.schema";
import { TypeProjectService } from "./typeProject.service";

@Module({
    imports :[MongooseModule.forFeature([{name: TypeProject.name, schema: TypeProjectSchema}])],
    controllers: [TypeProjectController],
    providers: [TypeProjectRepository, TypeProjectService],
    exports: []
})
export class TypeProjectModule{}