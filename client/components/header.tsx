import "./header.scss";
import { appStates, loadAppState, saveAppState } from "../store/saving";
import React from "react";

export function HeaderComponent() {
    const save = () => saveAppState("");
    const load = () => loadAppState(appStates[appStates.length - 1]);

    return (
        <div className="main-header">
            <button className="flat-button" onClick={ save }>SAVE STATE</button>
            <button className="flat-button" onClick={ load }>LOAD STATE</button>
        </div>
    )
}
