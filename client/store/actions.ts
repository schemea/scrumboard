import { Action } from "redux";
import { createUserStory, UserStory } from "../model/userstory";
import { AppState } from "./reducer";
import { Status } from "../model/status";


function createAction<Type extends string>(type: Type): Action<Type>;
function createAction<Type extends string, Props>(type: Type, props: Props): Action<Type> & Props;
function createAction<Type extends string>(type: Type, props = {}): Action<Type> {
    return {
        type,
        ...props,
    }
}

export const actions = {
    createUserStory(story: Partial<UserStory> & { name: string }) {
        return createAction("[AGILE] Create an User Story", { value: createUserStory(story) });
    },

    updateUserStory(story: Partial<UserStory> & { id: string }) {
        return createAction("[AGILE] Update an User Story", { value: story })
    },

    loadAppState(state: AppState) {
        return createAction("[CORE] Load Application State", { value: state });
    },

    setColumnsOrder(order: Status[]) {
        return createAction("[UI] Change columns order", { value: order })
    },

    setStoriesOrder(column: Status, order: string[]) {
        return createAction("[UI] Change stories order", { column, order })
    },
};

type ActionIndex = typeof actions;

export type Actions = ReturnType<ActionIndex[keyof ActionIndex]>;
