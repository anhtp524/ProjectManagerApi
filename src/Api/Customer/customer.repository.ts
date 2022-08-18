import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer, CustomerDocument } from "./customer.schema";
import { CreateCustomerDto, UpdateCustomerDto } from "./dto/customer.dto";


@Injectable()
export class CustomerRepository {
    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}
    
    async create(newItem: CreateCustomerDto) {
        const newCustomer = new this.customerModel(newItem)
        return newCustomer.save()
    }

    async getAll() {
        return this.customerModel.find()
    }

    async getById(_id: string) {
        return this.customerModel.findById(_id)
    }

    async update(_id: string,item: UpdateCustomerDto) {
        return this.customerModel.findByIdAndUpdate({_id: _id}, item)
    }

    async delete(_id: string) {
        return this.customerModel.findByIdAndDelete(_id)
    }
}