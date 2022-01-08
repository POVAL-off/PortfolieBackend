import {Arg, Args, Mutation, Query, Resolver} from "type-graphql";
import {AddSkill, Skill, SkillModel} from "../entities/skill";

@Resolver()
export class SkillResolver {

    @Query(() => [Skill])
    async getSkills() {
        return SkillModel.find();
    }

    @Query(() => Skill)
    async getSkill(@Arg("id") _id: string) {
        return SkillModel.findById(_id);
    }

    @Mutation(() => Skill)
    async addSkill(@Args() args: AddSkill) {
        return SkillModel.create(args);
    }

    @Mutation(() => Skill)
    async removeSkill(@Arg("id") _id: string) {
        return SkillModel.findByIdAndRemove(_id)
    }

    @Mutation(() => Skill)
    async editSkill(@Arg("id") _id: string, @Arg("skill") skill: AddSkill) {
        return SkillModel.findByIdAndUpdate(_id, skill)
    }
}