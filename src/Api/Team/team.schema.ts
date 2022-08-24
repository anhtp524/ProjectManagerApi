import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

export type TeamDocument = Team & Document

export class Team {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    founding: Date

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Employee"})
    manager: mongoose.Schema.Types.ObjectId

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Employee"}]})
    member: Types.ObjectId[]

    @Prop({type: [{type:mongoose.Schema.Types.ObjectId, ref: "Project"}]})
    project: Types.ObjectId[]
}

export const TeamSchema = SchemaFactory.createForClass(Team)