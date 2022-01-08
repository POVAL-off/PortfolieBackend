import {ArgsType, Field, ID, InputType, Int, ObjectType} from "type-graphql";
import {Typegoose} from "typegoose";
import {Length} from "class-validator";
import {Status} from "./enum-status";
import {column} from "../untils/decorator/column";

@ObjectType()
export class Skill extends Typegoose {
    @Field(() => ID, {nullable: true})
    readonly _id: string;

    @column({ required: true })
    name: string;

    @column()
    shortName: string;

    @column()
    description: string;

    @column({}, () => Int)
    progress: number

    @column({enum: Status}, () => Status)
    status: Status;
}

export const SkillModel = new Skill().getModelForClass<typeof Skill>(Skill);

@InputType()
@ArgsType()
export class AddSkill extends Typegoose {
    @Field({nullable: true})
    name: string;

    @Field({nullable: true})
    @Length(0, 10)
    shortName: string;

    @Field({nullable: true})
    description: string;

    @Field(() => Int, {nullable: true})
    progress: number;

    @Field(() => Status, {nullable: true, defaultValue: Status.ACTIVE})
    status: Status;
}