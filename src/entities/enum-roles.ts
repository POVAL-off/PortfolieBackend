import {registerEnumType} from "type-graphql";

export enum Role {
    USER = 'User',
    MODERATOR = 'Moderator',
    BETATESTER = 'BetaTester',
    ADMIN = 'Admin'
}

registerEnumType(Role, {
    name: 'Role',
    description: 'User role'
})