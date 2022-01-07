import {ArgsType, Field, InputType, Int, ObjectType} from "type-graphql";
import {prop, Typegoose} from "typegoose";
import {Length} from "class-validator";
import {Status} from "./enum-status";

@ObjectType()
export class Skill extends Typegoose {
    @Field({ nullable: true })
    readonly _id: string;

    @prop({ required: true })
    @Field()
    name: string;

    @prop()
    @Field({ nullable: true })
    shortName: string;

    @prop()
    @Field({ nullable: true })
    description: string;

    @prop()
    @Field(() => Int, { nullable: true })
    progress: number

    @prop({ enum: Status })
    @Field(() => Status, { nullable: true })
    status: Status;
}

export const SkillModel = new Skill().getModelForClass<typeof Skill>(Skill);

@InputType()
@ArgsType()
export class AddSkill extends Typegoose{
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    @Length(0, 10)
    shortName: string;

    @Field({ nullable: true })
    description: string;

    @Field(() => Int, { nullable: true })
    progress: number;

    @Field(() => Status, { nullable: true, defaultValue: Status.ACTIVE })
    status: Status;
}