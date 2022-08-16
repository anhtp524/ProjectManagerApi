import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type StatusDocument = StatusProject & Document

@Schema()
export class StatusProject {
    @Prop()
    name: string

    @Prop()
    status: string
}

export const StatusSchema = SchemaFactory.createForClass(StatusProject)