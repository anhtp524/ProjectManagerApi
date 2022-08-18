import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Technology } from "../Technology/technology.schema";

export type EmployeeDocument = Employee & Document

@Schema()
export class Employee {
    @Prop()
    name: string

    @Prop()
    birthday: Date

    @Prop()
    address: string

    @Prop()
    idCard: string

    @Prop()
    phoneNumber: string

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: Technology.name }]})
    technology: Types.ObjectId[]

    @Prop()
    experience: number

    @Prop()
    language: string[]

    @Prop()
    certificate: string[]
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)