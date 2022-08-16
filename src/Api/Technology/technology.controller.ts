import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateTechnologyDto, UpdateTechnologyDto } from "./dto/technology.dto";
import { TechnologyService } from "./technology.service";

@Controller('/technology')
export class TechnologyController {
    constructor(private technologyService: TechnologyService) {}

    @Post()
    createType(@Body() newTech: CreateTechnologyDto) {
        return this.technologyService.createType(newTech)
    }

    @Get()
    getAllTypeProject() {
        return this.technologyService.getAllType()
    }

    @Get('/:id')
    getTypeProjectById(@Param('id') id: string) {
        return this.technologyService.getTypeById(id)
    }

    @Patch('/:id')
    updateTypeProject(@Param('id') id: string, @Body() updateTech: UpdateTechnologyDto) {
        return this.technologyService.updateType(id, updateTech)
    }

    @Delete(':id')
    deleteTypeProject(@Param('id') id: string) {
        return this.technologyService.deleteType(id)
    }
}
