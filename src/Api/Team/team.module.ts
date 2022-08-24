import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TeamController } from "./team.controller";
import { TeamRepository } from "./team.repository";
import { Team, TeamSchema } from "./team.schema";
import { TeamService } from "./team.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Team.name, schema: TeamSchema}])],
    controllers: [TeamController],
    providers: [TeamRepository, TeamService],
})
export class TeamModule {}