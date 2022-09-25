import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Repository } from "src/Share/Database/Repository";
import { ProjectRepository } from "../Project/project.repository";
import { Customer, CustomerDocument } from "./customer.schema";
import { CreateCustomerDto, UpdateCustomerDto } from "./dto/customer.dto";


@Injectable()
export class CustomerRepository extends Repository<CustomerDocument> {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
        private projectRepo: ProjectRepository    
    ) {
        super(customerModel)
    }

    async delete(_id: string) {
        const findCustomer = await this.customerModel.find({_id: _id})
        if(!findCustomer || findCustomer.length === 0) throw new HttpException("Not found",HttpStatus.NOT_FOUND)
        const typeInProject = await this.projectRepo.findOne({type: _id})
        if(typeInProject && typeInProject.length !== 0) throw new HttpException("You can not delete", HttpStatus.NOT_ACCEPTABLE)
        await this.customerModel.findByIdAndDelete(_id)
        return "You have successfully deleted"
    }
}