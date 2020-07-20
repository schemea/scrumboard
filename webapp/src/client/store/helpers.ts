import { Action } from "redux";

export function createAction<Type extends string>(type: Type): Action<Type>;
export function createAction<Type extends string, Props>(type: Type, props: Props): Action<Type> & Props;
export function createAction<Type extends string>(type: Type, props = {}): Action<Type> {
    return {
        type,
        ...props,
    }
}
