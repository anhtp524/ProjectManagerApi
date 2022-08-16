import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateStatusDto, UpdateStatusDto } from "./dto/status.dto";
import { StatusService } from "./status.service";

@Controller('/statusproject')
export class StatusController {
    constructor(private statusService: StatusService) {}

    @Post()
    createType(@Body() newStatus: CreateStatusDto) {
        return this.statusService.createType(newStatus)
    }

    @Get()
    getAllTypeProject() {
        return this.statusService.getAllType()
    }

    @Get('/:id')
    getTypeProjectById(@Param('id') id: string) {
        return this.statusService.getTypeById(id)
    }

    @Patch('/:id')
    updateTypeProject(@Param('id') id: string, @Body() updateStatus: UpdateStatusDto) {
        return this.statusService.updateType(id, updateStatus)
    }

    @Delete(':id')
    deleteTypeProject(@Param('id') id: string) {
        return this.statusService.deleteType(id)
    }
}
