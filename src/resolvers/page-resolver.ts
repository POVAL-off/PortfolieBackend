import {Arg, Args, Mutation, Query, Resolver} from "type-graphql";
import {InputPage, Page, PageModel} from "../entities/page";

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

    @Mutation(() => Page)
    async addPage(@Args() args: InputPage) {
        return PageModel.create(args);
    }

    @Mutation(() => Page)
    async removePage(@Arg("id") _id: string) {
        return PageModel.findByIdAndRemove(_id)
    }

    @Mutation(() => Page)
    async editPage(@Arg("id") _id: string, @Arg("Page") Page: InputPage) {
        return PageModel.findByIdAndUpdate(_id, Page)
    }
}