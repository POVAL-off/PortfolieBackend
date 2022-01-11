import {Arg, Args, Authorized, Mutation, Query, Resolver} from "type-graphql";
import {AddSkill, Skill, SkillModel} from "../entities/skill";
import {FileService} from "../sevices/file-service";
import {Role} from "../entities/enum-roles";

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

    @Authorized([Role.ADMIN, Role.MODERATOR])
    @Mutation(() => Skill)
    async addSkill(@Args() { image, ...args }: AddSkill) {
        return SkillModel.create({...args, image: image ? await FileService.saveFile(image as any) : null});
    }

    @Authorized(Role.ADMIN)
    @Mutation(() => Skill)
    async removeSkill(@Arg("id") _id: string) {
        return SkillModel.findByIdAndRemove(_id)
    }

    @Authorized(Role.ADMIN)
    @Mutation(() => Skill)
    async editSkill(@Arg("id") _id: string, @Arg("skill") skill: AddSkill) {
        return SkillModel.findByIdAndUpdate(_id, skill)
    }
}