import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Customer } from "../Customer/customer.schema";
import { Employee } from "../Employee/employee.schema";
import { StatusProject } from "../StatusProject/status.schema";
import { Technology } from "../Technology/technology.schema";
import { TypeProject } from "../TypeProject/typeProject.schema";

export type ProjectDocument = Project & Document

@Schema()
export class Project {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: TypeProject.name})
    typeProject: Types.ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: StatusProject.name})
    status: Types.ObjectId

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: Technology.name}]})
    technology: Types.ObjectId[]

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: Employee.name}]})
    member: Types.ObjectId[]

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Customer.name})
    customer: Types.ObjectId

    @Prop()
    startDate: Date
}

export const ProjectSchema = SchemaFactory.createForClass(Project)