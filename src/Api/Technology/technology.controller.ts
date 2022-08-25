import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateTechnologyDto, UpdateTechnologyDto } from "./dto/technology.dto";
import { TechnologyService } from "./technology.service";

@Controller('/technology')
export class TechnologyController {
    constructor(private technologyService: TechnologyService) {}

    @Post()
    createTechnology(@Body() newTech: CreateTechnologyDto) {
        return this.technologyService.createTechnology(newTech)
    }

    @Get()
    getAllTechnology(@Query() {limit, page} : {limit: number, page: number}) {
        return this.technologyService.getAllTechnology(limit, page)
    }

    @Get('/:id')
    getTechnologyById(@Param('id') id: string) {
        return this.technologyService.getTechnologyById(id)
    }

    @Patch('/:id')
    updateTechnology(@Param('id') id: string, @Body() updateTech: UpdateTechnologyDto) {
        return this.technologyService.updateTechnology(id, updateTech)
    }

    @Delete(':id')
    deleteTechnology(@Param('id') id: string) {
        return this.technologyService.deleteTechnology(id)
    }
}
