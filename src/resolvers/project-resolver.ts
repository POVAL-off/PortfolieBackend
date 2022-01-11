import {Arg, Args, Authorized, Mutation, Query, Resolver} from "type-graphql";
import {InputProject, Project, ProjectModel} from "../entities/Project";
import {FileService} from "../sevices/file-service";
import {Role} from "../entities/enum-roles";

@Resolver()
export class ProjectResolver {

    @Query(() => [Project])
    async getProjects() {
        return ProjectModel.find();
    }

    @Query(() => Project)
    async getProject(@Arg("id") _id: string) {
        return ProjectModel.findById(_id);
    }

    @Authorized(Role.ADMIN)
    @Mutation(() => Project)
    async addProject(@Args() { image, ...args }: InputProject) {
        return ProjectModel.create({...args, image: image ? await FileService.saveFile(image as any) : null});
    }

    @Authorized(Role.ADMIN)
    @Mutation(() => Project)
    async removeProject(@Arg("id") _id: string) {
        return ProjectModel.findByIdAndRemove(_id)
    }

    @Authorized(Role.ADMIN)
    @Mutation(() => Project)
    async editProject(@Arg("id") _id: string, @Arg("project") project: InputProject) {
        return ProjectModel.findByIdAndUpdate(_id, project)
    }

    @Authorized(Role.ADMIN)
    @Mutation(() => Project)
    async addSkillsToProject(@Arg("id") _id: string, @Arg("skillsId", () => [String]) skillsId: string[]) {
        return ProjectModel.findByIdAndUpdate(_id, {
            $push: {
                stack: {
                    $each: skillsId
                }
            }
        })
    }

    @Authorized(Role.ADMIN)
    @Mutation(() => Project)
    async removeSkillsInProject(@Arg("id") _id: string, @Arg("skillsId", () => [String]) skillsId: string[]) {
        return ProjectModel.findByIdAndUpdate(_id, {
            $pullAll: {
                stack: skillsId
            }
        })
    }
}