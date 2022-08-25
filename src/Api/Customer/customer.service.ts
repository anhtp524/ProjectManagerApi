import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "./customer.repository";
import { CreateCustomerDto, UpdateCustomerDto } from "./dto/customer.dto";


@Injectable()
export class CustomerService {
    constructor(private customerRepo: CustomerRepository) {}

    createCustomer(newCustomer: CreateCustomerDto) {
        return this.customerRepo.create(newCustomer)
    }

    getAllCustomer(limit ?: number, page ?: number) {
        return this.customerRepo.getAll(limit, page)
    }

    getCustomerById(id: string) {
        return this.customerRepo.getById(id)
    }

    updateCustomer(id: string, updateCustomer: UpdateCustomerDto) {
        return this.customerRepo.update(id, updateCustomer)
    }

    deleteCustomer(id: string) {
        return this.customerRepo.delete(id)
    }
}