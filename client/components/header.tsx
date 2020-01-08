import "./header.scss";
import { appStates, saveAppState, SavedAppState, setAppStates } from "../store/saving";
import React, { Fragment, useCallback, useState } from "react";
import immutable from "immutable";
import { StateLoaderComponent } from "./state-loader";
import { RenderIf } from "./render-if";
import { StoryEditorComponent } from "./story-editor";
import { createUserStory } from "../model/userstory";
import { store } from "../store";
import { actions } from "../store/actions";
import { Status } from "../model/status";


export function HeaderComponent() {
    let input: HTMLInputElement | undefined;
    const [ isLoaderVisible, setLoaderVisibility ] = useState(false);
    const [ isEditorVisible, setEditorVisibility ] = useState(false);

    const save = () => {
        const value = prompt("name?");
        saveAppState(value || "");
    };

    const load = () => setLoaderVisibility(true);

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

    const [ newStory, setNewStory ] = useState();

    function createNewStory() {
        if (!newStory) {
            setNewStory(createUserStory({ name: "New Story", status: Status.Backlog  }));
        }
    }

    function onEditorCloseRequested() {
        setEditorVisibility(false);
        store.dispatch(actions.createUserStory(newStory));
        setNewStory(null);
    }

    function onClearAll() {
        store.dispatch(actions.clearAllUserStories());
    }

    return (
        <Fragment>
            <RenderIf condition={ isLoaderVisible } fadeDuration={ 200 }>
                <StateLoaderComponent onCloseRequested={ setLoaderVisibility.bind(null, false) }/>
            </RenderIf>
            <RenderIf condition={ isEditorVisible } fadeDuration={ 200 }>
                { createNewStory() }
                <StoryEditorComponent story={ newStory } onChange={ setNewStory }
                                      onCloseRequested={ onEditorCloseRequested }/>
            </RenderIf>
            <div className="main-header">
                <div>
                    <button className="flat-button" onClick={ save }>SAVE STATE</button>
                    <button className="flat-button" onClick={ load }>LOAD STATE</button>
                </div>
                <div>
                    <button className="flat-button" onClick={ setEditorVisibility.bind(null, true) }>NEW STORY</button>
                    <button className="flat-button" onClick={ onClearAll }>CLEAR ALL</button>
                </div>
                <div>
                    <input type="file" ref={ setInputRef } style={ { display: "none" } } onChange={ loadJSON }
                           accept="application/json"/>
                    <button className="flat-button" onClick={ exp }>EXPORT JSON</button>
                    <button className="flat-button" onClick={ imp }>IMPORT JSON</button>
                </div>
            </div>
        </Fragment>
    )
}
