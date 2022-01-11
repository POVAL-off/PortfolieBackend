import {Arg, Authorized, Mutation, Resolver} from "type-graphql";
import {Role} from "../entities/enum-roles";
import {User, UserModel} from "../entities/user";

@Resolver()
export class RoleResolver {
    @Authorized(Role.ADMIN)
    @Mutation(() => User)
    async addRoleUser(@Arg("id") userId: string, @Arg('role') role: Role) {
        return UserModel.findByIdAndUpdate(userId, {
            $set: {
                role
            }
        });
    }
}