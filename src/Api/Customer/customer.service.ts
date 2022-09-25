import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "./customer.repository";
import { CustomerDocument } from "./customer.schema";
import { CreateCustomerDto, UpdateCustomerDto } from "./dto/customer.dto";


@Injectable()
export class CustomerService {
    constructor(private customerRepo: CustomerRepository) {}

    createCustomer(newCustomer: CreateCustomerDto) {
        return this.customerRepo.create(<CustomerDocument>newCustomer)
    }

    getAllCustomer(limit ?: number, page ?: number, search ?: string) {
        return this.customerRepo.getAll(limit, page, search)
    }

    getCustomerById(id: string) {
        return this.customerRepo.getById(id)
    }

    async updateCustomer(id: string, updateCustomer: UpdateCustomerDto) {
        return await this.customerRepo.update(id, updateCustomer)
    }

    deleteCustomer(id: string) {
        return this.customerRepo.delete(id)
    }
}