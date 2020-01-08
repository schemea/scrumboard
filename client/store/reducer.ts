import { UserStory } from "../model/userstory";
import { Actions } from "./actions";
import immutable from "immutable";
import { Status } from "../model/status";
import lodash from "lodash";
import { createUser, User } from "../model/user";

export interface AppState {
    stories: immutable.Map<string, UserStory>;
    order: {
        stories: {
            [k in Status]?: string[]
        },
        columns: Status[]
    }
    users: immutable.Map<string, User>;
}

function toUserMap(users: User[]): immutable.Map<string, User> {
    return immutable.Map(users.reduce((map, user) => Object.assign(map, { [user.id]: user }), {}));
}

export const initialState: AppState = {
    stories: immutable.Map(),
    order: {
        stories: {},
        columns: [ Status.Backlog, Status.ToDo, Status.InProgress, Status.Reviewing, Status.Done ],
    },
    users: toUserMap([
        createUser("Frederic", "dev"),
        createUser("Adam", "dev"),
        createUser("Olivier", "dev"),
        createUser("Scott", "Lead dev"),
        createUser("Meyers", "Scrum"),
    ]),
};

export function reducer(state: AppState = initialState, action: Actions): AppState {
    switch (action.type) {
        case "[UI] Remove story from column":
            return immutable.updateIn(state, [ "order", "stories", action.column ], (order: string[]) => order.filter(id => id !== action.id));
        case "[UI] Insert story in column":
            return immutable.updateIn(state, [ "order", "stories", action.column ], (order: string[]) => order && [
                ...order.slice(0, action.index),
                action.id,
                ...order.slice(action.index),
            ]);
        case "[AGILE] Create an User Story":
            return {
                ...state,
                stories: state.stories.set(action.value.id, action.value),
            };
        case "[AGILE] Remove an User Story":
            return {
                ...state,
                stories: state.stories.filter(value => value.id !== action.value.id),
                order: immutable.updateIn(state.order, [ "stories", action.value.status ], (order: string[]) => order.filter(id => id !== action.value.id)),
            };
        case "[AGILE] Update an User Story":
            return {
                ...state,
                stories: state.stories.update(action.value.id, (value: UserStory) => ({ ...value, ...action.value })),
            };
        case "[AGILE] Clear all User Stories":
            return {
                ...state,
                stories: initialState.stories,
                order: initialState.order,
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
