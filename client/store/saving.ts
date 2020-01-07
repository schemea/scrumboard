import { AppState } from "./reducer";
import { store } from "./index";
import { actions } from "./actions";

interface SavedAppState {
    state: AppState;
    name: string;
}

export const appStates: SavedAppState[] = [];

export function saveAppState(name: string): void {
    appStates.push({
        name,
        state: store.getState(),
    });
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
