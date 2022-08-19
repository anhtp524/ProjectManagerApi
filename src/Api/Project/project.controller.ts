import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateProjectDto, UpdateProjectDto } from "./dto/project.dto";
import { ProjectService } from "./project.service";

@Controller('/project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Post()
    createProject(@Body() newProject: CreateProjectDto) {
        return this.projectService.createProject(newProject)
    }

    @Get()
    getAllProjectProject() {
        return this.projectService.getAllProject()
    }

    @Get('/:id')
    getProjectProjectById(@Param('id') id: string) {
        return this.projectService.getProjectById(id)
    }

    @Patch('/:id')
    updateProjectProject(@Param('id') id: string, @Body() updateProject: UpdateProjectDto) {
        return this.projectService.updateProject(id, updateProject)
    }

    @Delete(':id')
    deleteProjectProject(@Param('id') id: string) {
        return this.projectService.deleteProject(id)
    }
}
