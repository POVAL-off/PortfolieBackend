import { Request } from "express";
import {Session} from "express-session";

export interface MyContext {
    req: Request;
}

export interface ICookie extends Session{
    userId: string
}