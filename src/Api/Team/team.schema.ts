import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Employee } from "../Employee/employee.schema";
import { Project } from "../Project/project.schema";

export type TeamDocument = Team & Document

@Schema()
export class Team {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    founding: Date

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Employee.name})
    manager: Types.ObjectId

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: Employee.name}]})
    member: Types.ObjectId[]

    @Prop({type: [{type:mongoose.Schema.Types.ObjectId, ref: Project.name}]})
    project: Types.ObjectId[]
}

export const TeamSchema = SchemaFactory.createForClass(Team)