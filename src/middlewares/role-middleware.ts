import {ICookie, MyContext} from "../types/my-context";
import {AuthChecker} from "type-graphql";
import {Session} from "express-session";
import {UserModel} from "../entities/user";

export const customAuthChecker: AuthChecker<MyContext> = async ({ context }, roles: string[]) => {
    const userId = (context.req.session as Session & ICookie).userId;

    if (!roles.length) {
        return true;
    }

    const user = await UserModel.findById(userId);

    return !!user && roles.includes(user!.role);
}