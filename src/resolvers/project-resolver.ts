import {Arg, Args, ID, Mutation, Query, Resolver} from "type-graphql";
import {InputProject, Project, ProjectModel} from "../entities/Project";

@Resolver()
export class ProjectResolver {

    @Query(() => [Project])
    async getProjects() {
        return ProjectModel.find();
    }

    @Query(() => Project)
    async getProject(@Arg("id") _id: string) {
        const project = await ProjectModel.findById(_id);

        if (!project) {
            throw new Error('Project is not found');
        }

        return project;
    }

    @Mutation(() => Project)
    async addProject(@Args() args: InputProject) {
        return ProjectModel.create(args);
    }

    @Mutation(() => Project)
    async removeProject(@Arg("id") _id: string) {
        return ProjectModel.findByIdAndRemove(_id)
    }

    @Mutation(() => Project)
    async editProject(@Arg("id") _id: string, @Arg("project") project: InputProject) {
        return ProjectModel.findByIdAndUpdate(_id, project)
    }

    @Mutation(() => Project)
    async addSkillsToProject(@Arg("id") _id: string, @Arg("skillsId", returns => [String]) skillsId: string[]) {
        return ProjectModel.findByIdAndUpdate(_id, {
            $push: {
                stack: {
                    $each: skillsId
                }
            }
        })
    }

    @Mutation(() => Project)
    async removeSkillsInProject(@Arg("id") _id: string, @Arg("skillsId", returns => [String]) skillsId: string[]) {
        return ProjectModel.findByIdAndUpdate(_id, {
            $pullAll: {
                stack: skillsId
            }
        })
    }
}