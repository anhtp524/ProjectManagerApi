import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/Auth/guard/role.guard";
import { Role } from "../Account/enum/role.enum";
import { CreateProjectTypeDto, UpdateProjectTypeDto } from "./dto/typeProject.dto";
import { TypeProjectService } from "./typeProject.service";

@ApiBearerAuth()
@ApiTags("Type-Project")
@Controller('/typeproject')
@UseGuards(AuthGuard('jwt'))
export class TypeProjectController {
    constructor(private typeService: TypeProjectService) {}

    @Post()
    @UseGuards(new RolesGuard(Role.ADMIN))
    createType(@Body() newType: CreateProjectTypeDto) {
        return this.typeService.createType(newType)
    }

    @ApiQuery({name : "limit", required: false})
    @ApiQuery({name : "page", required: false})
    @Get()
    getAllTypeProject(@Query() {limit, page}: {limit: number, page: number}) {
        return this.typeService.getAllType(limit, page)
    }

    @Get('/:id')
    getTypeProjectById(@Param('id') id: string) {
        return this.typeService.getTypeById(id)
    }

    @Patch('/:id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    updateTypeProject(@Param('id') id: string, @Body() updateType: UpdateProjectTypeDto) {
        return this.typeService.updateType(id, updateType)
    }

    @Delete(':id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    deleteTypeProject(@Param('id') id: string) {
        return this.typeService.deleteType(id)
    }
}
