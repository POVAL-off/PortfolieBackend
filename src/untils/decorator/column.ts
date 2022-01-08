import {prop, PropOptionsWithValidate} from "typegoose";
import {ReturnTypeFunc} from "type-graphql/dist/decorators/types";
import {Field, FieldOptions} from "type-graphql";

export const column = (propOption?: PropOptionsWithValidate, returnTypeFunction?: ReturnTypeFunc, fieldOption?: FieldOptions) => {
    const fieldOptionInProp: FieldOptions = {
        nullable: !(propOption as any)?.required,
        ...fieldOption
    };

    return (target: any, propertyKey: string) => {
        prop(propOption)(target, propertyKey);
        (returnTypeFunction ? Field(returnTypeFunction, fieldOptionInProp || {}) : Field(fieldOptionInProp || {}))(target, propertyKey);
    }
}