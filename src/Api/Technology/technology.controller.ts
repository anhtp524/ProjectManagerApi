import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/Auth/guard/role.guard";
import { Role } from "../Account/enum/role.enum";
import { CreateTechnologyDto, UpdateTechnologyDto } from "./dto/technology.dto";
import { TechnologyService } from "./technology.service";

@Controller('/technology')
@UseGuards(AuthGuard('jwt'))
export class TechnologyController {
    constructor(private technologyService: TechnologyService) {}

    @Post()
    @UseGuards(new RolesGuard(Role.ADMIN))
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
    @UseGuards(new RolesGuard(Role.ADMIN))
    updateTechnology(@Param('id') id: string, @Body() updateTech: UpdateTechnologyDto) {
        return this.technologyService.updateTechnology(id, updateTech)
    }

    @Delete(':id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    deleteTechnology(@Param('id') id: string) {
        return this.technologyService.deleteTechnology(id)
    }
}
