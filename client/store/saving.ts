import { AppState } from "./reducer";
import { store } from "./index";
import { actions } from "./actions";
import immutable from "immutable";

export interface SavedAppState {
    state: AppState;
    name: string;
}

export let appStates: SavedAppState[] = [];

{
    const states: SavedAppState[] = JSON.parse(localStorage.getItem("appStates") || "[]");
    states.forEach(savedState => deserializeState(savedState.state));
    setAppStates(states);
}

export function setAppStates(states: SavedAppState[]) {
    appStates = states;
}

export function saveAppState(name: string): void {
    if (!name) {
        return;
    }

    const index = appStates.findIndex(value => value.name === name);
    const state = {
        name,
        state: store.getState(),
    };

    if (index >= 0) {
        appStates[index] = state;
    } else {
        appStates.push(state);
    }


    localStorage.setItem("appStates", JSON.stringify(appStates));
}

export function loadAppState(name: string): void;
export function loadAppState(state: SavedAppState): void;
export function loadAppState(state: AppState): void;
export function loadAppState(arg: string | SavedAppState | AppState) {
    let state: AppState | undefined;

    if (typeof arg === "string") {
        state = appStates.find(value => value.name === arg)?.state;
    } else if ("state" in arg) {
        state = arg.state;
    } else {
        state = arg;
    }

    if (state) {
        store.dispatch(actions.loadAppState(state));
    }
}

export function deserializeState(state: AppState) {
    state.stories = immutable.Map(state.stories);
    state.users   = immutable.Map(state.users);

    return state;
}

export function loadFromJSON(json: string) {
    loadAppState(deserializeState(JSON.parse(json)));
}
