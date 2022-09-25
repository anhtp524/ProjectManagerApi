import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from 'src/Share/Database/Repository';
import { EmployeeRepository } from '../Employee/employee.repository';
import { ProjectRepository } from '../Project/project.repository';
import { CreateTechnologyDto, UpdateTechnologyDto } from './dto/technology.dto';
import { Technology, TechnologyDocument } from './technology.schema';

@Injectable()
export class TechnologyRepository extends Repository<TechnologyDocument> {
  constructor(
    @InjectModel(Technology.name)
    private technologyModel: Model<TechnologyDocument>,
    private projectRepo: ProjectRepository,
    private employeeRepo: EmployeeRepository,
  ) {
    super(technologyModel)
  }

  async delete(_id: string) {
    const findTech = await this.technologyModel.find({ _id: _id });
    if (!findTech || findTech.length === 0) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const techInProject = await this.projectRepo.findOne({ technology: _id });
    const techInEmployee = await this.employeeRepo.findOne({technology: _id});
    if ((techInProject && techInProject.length != 0) ||
        (techInEmployee && techInEmployee.length != 0)) throw new HttpException('You can not delete', HttpStatus.NOT_ACCEPTABLE);
    await this.technologyModel.findByIdAndDelete(_id);
    return 'You have successfully deleted';
   }
}
