import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateProjectTypeDto, UpdateProjectTypeDto } from "./dto/typeProject.dto";
import { TypeProjectService } from "./typeProject.service";

@Controller('/typeproject')
export class TypeProjectController {
    constructor(private typeService: TypeProjectService) {}

    @Post()
    createType(@Body() newType: CreateProjectTypeDto) {
        return this.typeService.createType(newType)
    }

    @Get()
    getAllTypeProject() {
        return this.typeService.getAllType()
    }

    @Get('/:id')
    getTypeProjectById(@Param('id') id: string) {
        return this.typeService.getTypeById(id)
    }

    @Patch('/:id')
    updateTypeProject(@Param('id') id: string, @Body() updateType: UpdateProjectTypeDto) {
        return this.typeService.updateType(id, updateType)
    }

    @Delete(':id')
    deleteTypeProject(@Param('id') id: string) {
        return this.typeService.deleteType(id)
    }
}
