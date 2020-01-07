import { UserStory } from "../model/userstory";
import { Actions } from "./actions";
import immutable from "immutable";
import { Status } from "../model/status";
import lodash from "lodash";

export interface AppState {
    stories: immutable.Map<string, UserStory>;
    order: {
        stories: {
            [k in Status]?: string[]
        },
        columns: Status[]
    }
}

export const initialState: AppState = {
    stories: immutable.Map(),
    order: {
        stories: {},
        columns: [Status.ToDo, Status.InProgress, Status.Reviewing, Status.Done],
    },
};

export function reducer(state: AppState = initialState, action: Actions): AppState {
    switch (action.type) {
        case "[AGILE] Create an User Story":
            return {
                ...state,
                stories: state.stories.set(action.value.id, action.value),
            };
        case "[AGILE] Update an User Story":
            return {
                ...state,
                stories: state.stories.update(action.value.id, (value: UserStory) => ({ ...value, ...action.value })),
            };
        case "[CORE] Load Application State":
            return action.value;
        case "[UI] Change columns order":
            return lodash.merge({}, state, { order: { columns: action.value } } as AppState);
        case "[UI] Change stories order":
            return lodash.merge({}, state, { order: { stories: { [action.column]: action.order } } } as AppState);
        default:
            return state;
    }
}
