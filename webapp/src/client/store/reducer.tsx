import { combineReducers } from "redux";
import { coreReducer } from "@core/store/reducer";

export const reducers = combineReducers({
    core: coreReducer
});

export type AppState = ReturnType<typeof reducers>;
