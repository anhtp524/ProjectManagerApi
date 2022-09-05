import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ExcludeProperty } from "nestjs-mongoose-exclude";
import { Role } from "./enum/role.enum";

export type AccountDocument = Account & Document

@Schema()
export class Account {
    @Prop({required: true, unique: true})
    username: string

    @Prop({required: true})
    @ExcludeProperty()
    password: string

    @Prop({required: true})
    name: string
    
    @Prop({required: true})
    role: Role

    @Prop({type: String})
    refreshToken: string


}

export const AccountSchema = SchemaFactory.createForClass(Account)