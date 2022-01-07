import {registerEnumType} from "type-graphql";

export enum Status {
    ACTIVE = 'Active',
    SHORT = 'Short',
    HIDDEN = 'Hidden',
    DISABLE = 'Disable'
}

registerEnumType(Status, {
    name: 'Status',
    description: 'Status entity'
})