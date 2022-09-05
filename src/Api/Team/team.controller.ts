import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/Auth/guard/role.guard";
import { Role } from "../Account/enum/role.enum";
import { CreateTeamDto, UpdateTeamDto } from "./dto/team.dto";
import { TeamService } from "./team.service";


@Controller('/team')
@UseGuards(AuthGuard('jwt'))
export class TeamController {
    constructor(private teamService: TeamService) {}

    @Post()
    @UseGuards(new RolesGuard(Role.ADMIN))
    createTeam(@Body() newTeam: CreateTeamDto) {
        return this.teamService.createTeam(newTeam)
    }

    @Get()
    getAllTeam(@Query() {limit, page} : {limit: number, page: number}) {
        return this.teamService.getAllTeam(limit, page)
    }

    @Get('/:name/member')
    getMember(@Param('name') name: string) {
        return this.teamService.getMember(name)
    }

    @Get('/:name/project')
    getProject(@Param('name') name: string) {
        return this.teamService.getProject(name)
    }

    @Get('/:id')
    getTeamById(@Param('id') id: string) {
        return this.teamService.getTeamById(id)
    }

    @Patch('/:id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    updateTeam(@Param('id') id: string, @Body() updateTeam: UpdateTeamDto) {
        return this.teamService.updateTeam(id, updateTeam)
    }

    @Delete(':id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    deleteTeam(@Param('id') id: string) {
        return this.teamService.deleteTeam(id)
    }
}
