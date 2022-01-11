import {ArgsType, Field, ID, InputType, ObjectType} from "type-graphql";
import {Typegoose} from "typegoose";
import {column} from "../untils/decorator/column";
import {Role} from "./enum-roles";
import {Length} from "class-validator";

@ObjectType()
export class User extends Typegoose {
    @Field(() => ID, {nullable: true})
    readonly _id: string;

    @column({ required: true, unique: true })
    nickName: string;

    @column({ required: true })
    password: string

    @column({enum: Role}, () => Role)
    role: Role;
}

export const UserModel = new User().getModelForClass<typeof User>(User);

@ArgsType()
@InputType()
export class RegisterUser extends Typegoose {
    @column({ required: true, unique: true })
    nickName: string;

    @column({ required: true })
    @Length(5, 20)
    password: string
}