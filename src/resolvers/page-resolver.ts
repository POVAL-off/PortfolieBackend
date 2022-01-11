import {Arg, Args, Authorized, Mutation, Query, Resolver} from "type-graphql";
import {InputPage, Page, PageModel} from "../entities/page";
import {Role} from "../entities/enum-roles";

@Resolver()
export class PageResolver {

    @Query(() => [Page])
    async getPages() {
        return PageModel.find();
    }

    @Query(() => Page)
    async getPage(@Arg("id") _id: string) {
        return PageModel.findById(_id);
    }

    @Authorized(Role.ADMIN)
    @Mutation(() => Page)
    async addPage(@Args() args: InputPage) {
        return PageModel.create(args);
    }

    @Authorized(Role.ADMIN)
    @Mutation(() => Page)
    async removePage(@Arg("id") _id: string) {
        return PageModel.findByIdAndRemove(_id)
    }

    @Authorized(Role.ADMIN)
    @Mutation(() => Page)
    async editPage(@Arg("id") _id: string, @Arg("Page") Page: InputPage) {
        return PageModel.findByIdAndUpdate(_id, Page)
    }
}