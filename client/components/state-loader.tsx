import "./state-loader.scss";
import { appStates } from "../store/saving";
import { AppState } from "../store/reducer";
import { store } from "../store";
import { actions } from "../store/actions";
import React from "react";
import { ModalComponent } from "./modal";
import { overlay } from "./overlay";
import { RenderIf } from "./render-if";
import classNames from "classnames";

export function StateLoaderComponent({ onCloseRequested }: { onCloseRequested: () => void }) {
    function loader(state: AppState) {
        return function () {
            store.dispatch(actions.loadAppState(state));
            overlay.hide();
        }
    }

    const children = appStates.map((value, index) => (
        <div onClick={ loader(value.state) } key={ index }>
            { value.name ? value.name : <i style={ { fontSize: "0.9em", color: "#444" } }>no name</i> }
        </div>
    ));

    return (
        <ModalComponent onCloseRequested={ onCloseRequested } minHeight="30vh" minWidth="30vw">
            <div className={ classNames("state-loader", { "nothing": children.length === 0 }) }>
                <RenderIf condition={ children.length > 0 }>
                    <div className="state-list">
                        { children }
                    </div>
                </RenderIf>
                <RenderIf condition={ children.length === 0 }>
                    Nothing...
                </RenderIf>
            </div>
        </ModalComponent>
    )
}
