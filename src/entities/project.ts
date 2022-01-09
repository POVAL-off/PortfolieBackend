import {ArgsType, Field, Float, ID, InputType, ObjectType} from "type-graphql";
import {Typegoose} from "typegoose";
import {Status} from "./enum-status";
import {column} from "../untils/decorator/column";
import {GraphQLUpload} from "graphql-upload";


@ObjectType()
export class Project extends Typegoose {
    @Field(() => ID)
    _id: string

    @column({required: true})
    name: string

    @column()
    description: string

    @column()
    descriptionShort: string;

    @column({}, () => Float)
    rate: number;

    @column()
    createDate: Date;

    @column({enum: Status}, () => Status)
    status: Status;

    @column({}, () => [ID], { nullable: 'itemsAndList' })
    stack: typeof ID[]

    @column()
    image: string;
}

export const ProjectModel = new Project().getModelForClass<typeof Project>(Project);

@ArgsType()
@InputType()
export class InputProject extends Typegoose {
    @Field({nullable: true})
    name: string

    @Field({nullable: true})
    description: string

    @Field({nullable: true})
    descriptionShort: string;

    @Field(() => Float, {nullable: true})
    rate: number;

    @Field({nullable: true})
    createDate: Date;

    @Field(() => Status, {defaultValue: Status.ACTIVE})
    status: Status;

    @Field(() => [ID], { nullable: true} )
    stack: [String]

    @Field(() => GraphQLUpload, { nullable: true })
    image: typeof GraphQLUpload;
}