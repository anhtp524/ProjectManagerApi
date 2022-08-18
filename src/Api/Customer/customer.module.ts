import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerController } from "./customer.controller";
import { CustomerRepository } from "./customer.repository";
import { Customer, CustomerSchema } from "./customer.schema";
import { CustomerService } from "./customer.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Customer.name, schema: CustomerSchema}])],
    controllers: [CustomerController],
    providers: [CustomerRepository, CustomerService],
})
export class CustomerModule {}