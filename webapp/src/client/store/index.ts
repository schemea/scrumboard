import { createStore } from "redux";
import { reducers } from "./reducer";
import { devToolsEnhancer } from "redux-devtools-extension";

export const store = createStore(reducers, devToolsEnhancer({
    actionCreators: [

    ]
}))
