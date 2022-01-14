import {Args, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {RegisterUser, User, UserModel} from "../entities/user";
import * as bcrypt from 'bcrypt';
import {ICookie, MyContext} from "../types/my-context";
 import {getCookie} from "../untils/getCookie";

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async registration(@Args() {nickName, password}: RegisterUser) {
        const candidate = await UserModel.findOne({nickName});

        if (candidate) {
            throw new Error('User is register')
        }

        const hashPassword = await bcrypt.hash(password, 10);
        return await UserModel.create({
            nickName,
            password: hashPassword
        });
    }

    @Mutation(() => User)
    async login(@Args() {nickName, password}: RegisterUser, @Ctx() ctx: MyContext) {
        const user = await UserModel.findOne({nickName});

        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return null;
        }

        (ctx.req.session as ICookie).userId = user._id.toString();

        return user;
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: MyContext): Promise<boolean> {
        return new Promise((response, reject) => {
            ctx.req.session.destroy(error => {
                    if (error) {
                        console.log(error);
                        reject(false);
                    }

                    response(true);
                }
            );
        })
    }

    @Query(() => User)
    async me(@Ctx() ctx: MyContext) {
        const userId = getCookie(ctx, 'userId')

        if (!userId) {
            return null;
        }

        return UserModel.findById(userId)
    }
}