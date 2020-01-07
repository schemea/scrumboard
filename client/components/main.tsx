import React from "react";
import { OverlayComponent } from "./overlay";
import { Provider } from "react-redux";
import { store } from "../store";
import { HeaderComponent } from "./header";
import { ScrumboardComponent } from "./scrumboard";

export function MainComponent() {
    return (
        <Provider store={ store }>
            <OverlayComponent/>
            <HeaderComponent/>
            <ScrumboardComponent/>
        </Provider>
    )
}
