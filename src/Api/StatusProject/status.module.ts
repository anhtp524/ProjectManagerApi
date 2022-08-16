import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StatusController } from "./status.controller";
import { StatusRepository } from "./status.repository";
import { StatusProject, StatusSchema } from "./status.schema";
import { StatusService } from "./status.service";

@Module({
    imports: [MongooseModule.forFeature([{name: StatusProject.name, schema: StatusSchema}])],
    controllers: [StatusController],
    providers: [StatusRepository, StatusService],
})
export class StatusModule {}