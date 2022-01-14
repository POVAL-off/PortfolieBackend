import {MyContext} from "../types/my-context";
import {AuthChecker} from "type-graphql";
import {UserModel} from "../entities/user";
import {getCookie} from "../untils/getCookie";

export const customAuthChecker: AuthChecker<MyContext> = async ({ context }, roles: string[]) => {
    const userId = getCookie(context, "userId");

    if (!roles.length && userId) {
        return true;
    }

    const user = await UserModel.findById(userId);

    return !!user && roles.includes(user!.role);
}