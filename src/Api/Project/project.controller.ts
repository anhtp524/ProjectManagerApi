import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/Auth/guard/role.guard";
import { Role } from "../Account/enum/role.enum";
import { CreateProjectDto, UpdateProjectDto } from "./dto/project.dto";
import { ProjectService } from "./project.service";

@ApiBearerAuth()
@ApiTags("Project")
@Controller('/project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Post()
    @UseGuards(new RolesGuard(Role.ADMIN))
    createProject(@Body() newProject: CreateProjectDto) {
        return this.projectService.createProject(newProject)
    }

    @ApiQuery({name : "limit", required: false})
    @ApiQuery({name : "page", required: false})
    @Get()
    getAllProject(@Query() {limit, page} : {limit: number, page: number}) {
        return this.projectService.getAllProject(limit,page)
    }

    @Get('statistical')
    @ApiQuery({name : "status", required: false})
    @ApiQuery({name : "type", required: false})
    @ApiQuery({name : "technology", required: false})
    @ApiQuery({name : "customer", required: false})
    @ApiQuery({name : "date", required: false})
    countProject(@Query() {status, type, technology, customer, date} : {status ?: string, type ?: string, technology ?: string, customer ?: string, date ?: string}) {
        return this.projectService.countProjects(status, type, technology, customer, date)
    }

    @Get('/:name/member')
    getMember(@Param('name') name: string) {
        return this.projectService.getMember(name)
    }

    @Get('/:id')
    getProjectById(@Param('id') id: string) {
        return this.projectService.getProjectById(id)
    }

    @Patch('/:id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    updateProject(@Param('id') id: string, @Body() updateProject: UpdateProjectDto) {
        return this.projectService.updateProject(id, updateProject)
    }

    @Delete(':id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    deleteProject(@Param('id') id: string) {
        return this.projectService.deleteProject(id)
    }
}
