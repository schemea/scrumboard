import "./header.scss";
import { appStates, loadAppState, saveAppState, SavedAppState, setAppStates } from "../store/saving";
import React, { useCallback } from "react";
import immutable from "immutable";


export function HeaderComponent() {
    let input: HTMLInputElement | undefined;

    const save = () => saveAppState("");
    const load = () => loadAppState(appStates[appStates.length - 1]);

    const exp = () => {
        const data      = JSON.stringify(appStates);
        const blob      = new Blob([ data ], { type: "application/json" });
        const url       = URL.createObjectURL(blob);
        const anchor    = document.createElement("a");
        anchor.download = "states.json";
        anchor.href     = url;
        anchor.click();
    };

    const imp = () => input?.click();

    const loadJSON = () => {
        const file = input?.files?.item(0);
        if (!file) {
            return;
        }
        const reader  = new FileReader();
        reader.onload = function () {
            const states: SavedAppState[] = JSON.parse(reader.result as string);
            states.forEach(savedState => {
                savedState.state.stories = immutable.Map(savedState.state.stories);
            });
            setAppStates(states);
        };
        reader.readAsText(file);
    };

    const setInputRef = useCallback(function (element: HTMLInputElement) {
            input = element;
        }, [ input ],
    );

    return (
        <div className="main-header">
            <div>
                <button className="flat-button" onClick={ save }>SAVE STATE</button>
                <button className="flat-button" onClick={ load }>LOAD STATE</button>
            </div>
            <div>
                <input type="file" ref={ setInputRef } style={ { display: "none" } } onChange={ loadJSON }
                       accept="application/json"/>
                <button className="flat-button" onClick={ exp }>EXPORT JSON</button>
                <button className="flat-button" onClick={ imp }>IMPORT JSON</button>
            </div>
        </div>
    )
}
