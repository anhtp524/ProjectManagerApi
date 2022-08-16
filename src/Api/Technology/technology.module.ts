import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TechnologyController } from "./technology.controller";
import { TechnologyRepository } from "./technology.repository";
import { Technology, TechnologySchema } from "./technology.schema";
import { TechnologyService } from "./technology.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Technology.name, schema: TechnologySchema}])],
    controllers: [TechnologyController],
    providers: [TechnologyRepository, TechnologyService],
})
export class TechnologyModule {}