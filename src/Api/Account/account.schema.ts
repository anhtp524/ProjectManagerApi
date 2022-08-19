import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { Document } from "mongoose";
import { Role } from "./enum/role.enum";

export type AccountDocument = Account & Document

@Schema()
export class Account {
    @Prop({required: true, unique: true})
    username: string

    @Prop({required: true})
    @Exclude()
    password: string

    @Prop({required: true})
    name: string
    
    @Prop({required: true})
    role: Role

}

export const AccountSchema = SchemaFactory.createForClass(Account)