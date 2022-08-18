import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";
import { Employee, EmployeeDocument } from "./employee.schema";

@Injectable()
export class EmployeeRepository {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}
    
    async create(newItem: any) {
        const newEmployee = new this.employeeModel(newItem)
        return newEmployee.save()
    }

    async getAll() {
        return this.employeeModel.find({}).populate('technology' ,'name')
    }

    async getById(_id: string) {
        return this.employeeModel.findById(_id).populate('technology', 'name')
    }

    async update(_id: string,item: any) {
        return this.employeeModel.findByIdAndUpdate({_id: _id}, {$set:item})
    }

    async delete(_id: string) {
        return this.employeeModel.findByIdAndDelete(_id)
    }
}