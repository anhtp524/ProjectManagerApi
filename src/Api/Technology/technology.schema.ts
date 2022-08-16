import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TechnologyDocument = Technology & Document

@Schema()
export class Technology {
    @Prop()
    name: string

    @Prop()
    status: string
}

export const TechnologySchema = SchemaFactory.createForClass(Technology)