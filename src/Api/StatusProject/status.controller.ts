import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateStatusDto, UpdateStatusDto } from "./dto/status.dto";
import { StatusService } from "./status.service";

@Controller('/statusproject')
export class StatusController {
    constructor(private statusService: StatusService) {}

    @Post()
    createStatus(@Body() newStatus: CreateStatusDto) {
        return this.statusService.createStatus(newStatus)
    }

    @Get()
    getAllStatusProject() {
        return this.statusService.getAllStatus()
    }

    @Get('/:id')
    getStatusProjectById(@Param('id') id: string) {
        return this.statusService.getStatusById(id)
    }

    @Patch('/:id')
    updateStatusProject(@Param('id') id: string, @Body() updateStatus: UpdateStatusDto) {
        return this.statusService.updateStatus(id, updateStatus)
    }

    @Delete(':id')
    deleteStatusProject(@Param('id') id: string) {
        return this.statusService.deleteStatus(id)
    }
}
