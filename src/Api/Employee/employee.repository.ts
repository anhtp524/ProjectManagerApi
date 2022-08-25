import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Employee, EmployeeDocument } from "./employee.schema";

@Injectable()
export class EmployeeRepository {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}
    
    async create(newItem: any) {
        const newEmployee = new this.employeeModel(newItem)
        return newEmployee.save()
    }

    async getAll(limit ?: number, page :number = 1) {
        const totalDocs = await this.employeeModel.countDocuments()
        const totalPage = Math.ceil(totalDocs / limit)

        if(limit) {
            if(page <= totalPage) {
                const docsView = await this.employeeModel  
                                    .find({})
                                    .skip((page - 1) * limit) 
                                    .limit(limit)
                                    .populate("technology", "name")
                return {
                    currentPage: page,
                    totalPage: totalPage,
                    data: docsView
                }
            }
            else throw new HttpException("Page is not exis", HttpStatus.NOT_FOUND)
        }
        else {
            return this.employeeModel.find().populate("technology", "name")
        }     
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