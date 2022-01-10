import {ArgsType, Field, ID, InputType, ObjectType} from "type-graphql";
import {Typegoose} from "typegoose";
import {column} from "../untils/decorator/column";
import {Status} from "./enum-status";

@ObjectType()
export class Page extends Typegoose {
    @Field(() => ID, {nullable: true})
    readonly _id: string;

    @column({ required: true })
    name: string;

    @column()
    link: string;

    @column({enum: Status}, () => Status)
    status: Status;
}

export const PageModel = new Page().getModelForClass<typeof Page>(Page);

@ArgsType()
@InputType()
export class InputPage extends Typegoose {
    @Field()
    name: string;

    @Field()
    link: string;

    @Field(() => Status, {nullable: true, defaultValue: Status.ACTIVE})
    status: Status;
}