import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/Auth/guard/role.guard";
import { Role } from "../Account/enum/role.enum";
import { CreateStatusDto, UpdateStatusDto } from "./dto/status.dto";
import { StatusService } from "./status.service";

@ApiBearerAuth()
@ApiTags("Status-Project")
@Controller('/statusproject')
@UseGuards(AuthGuard('jwt'))
export class StatusController {
    constructor(private statusService: StatusService) {}

    @Post()
    @UseGuards(new RolesGuard(Role.ADMIN))
    createStatus(@Body() newStatus: CreateStatusDto) {
        return this.statusService.createStatus(newStatus)
    }

    @ApiQuery({name : "limit", required: false})
    @ApiQuery({name : "page", required: false})
    @Get()
    getAllStatusProject(@Query() {limit, page}: {limit: number, page: number}) {
        return this.statusService.getAllStatus(limit, page)
    }

    @Get('/:id')
    getStatusProjectById(@Param('id') id: string) {
        return this.statusService.getStatusById(id)
    }

    @Patch('/:id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    updateStatusProject(@Param('id') id: string, @Body() updateStatus: UpdateStatusDto) {
        return this.statusService.updateStatus(id, updateStatus)
    }

    @Delete(':id')
    @UseGuards(new RolesGuard(Role.ADMIN))
    deleteStatusProject(@Param('id') id: string) {
        return this.statusService.deleteStatus(id)
    }
}
