import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TypeProjectDocument = TypeProject & Document

@Schema()
export class TypeProject {
    @Prop()
    name: string

    @Prop()
    status: string
}

export const TypeProjectSchema = SchemaFactory.createForClass(TypeProject)