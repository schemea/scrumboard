import { AppState, reducer } from "./reducer";
import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { actions } from "./actions";
import { Status } from "../model/status";

export let store = createStore(
    reducer,
    devToolsEnhancer({ actionCreators: actions }),
);

export function selectStories(state: AppState) {
    return state.stories;
}

export function selectStoryWithID(state: AppState, id: string) {
    return selectStories(state).get(id);
}

export function selectOrder(state: AppState) {
    return state.order;
}

export function selectStoryOrder(state: AppState, id: Status) {
    return selectOrder(state).stories[id] || [];
}

export function selectColumnOrder(state: AppState) {
    return selectOrder(state).columns;
}
