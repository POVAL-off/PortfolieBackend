import {MyContext} from "../types/my-context";
import {MemoryStore} from "express-session";

export const getCookie = (ctx: MyContext, cookieField: string) => {
    const session = (((ctx.req as any).sessionStore as MemoryStore) as any).sessions;
    const myCookie = (Object.values(session) as Array<string>).find(item => item.includes(cookieField));
    return JSON.parse(myCookie || '')[cookieField];
}