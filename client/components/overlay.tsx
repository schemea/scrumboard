import "./overlay.scss";
import React, { useCallback, useEffect, useState } from "react";
import { RenderIf } from "./render-if";

type Event = "hide" | "show" | "visibilitychanged";

interface Listener {
    event: Event;
    callback: Function;
    level: number;
}

const listeners: Listener[] = [];

let visibilityCounter = 0;

let instantiated = false;

export const overlay = {
    setVisibility(value: boolean): void { throw "Overlay use before being instantiated"; },
    isVisible(): boolean { throw "Overlay use before being instantiated"; },
    show(): void { this.setVisibility(true); },
    hide(): void { this.setVisibility(false); },
    toggleVisibility(): void { this.setVisibility(!this.isVisible()); },
    addEventListener(event: Event, callback: Function): Listener {
        const listener = { event, callback, level: visibilityCounter };
        listeners.push(listener);

        return listener;
    },
    removeEventListener(listener: Listener) {
        listeners.splice(listeners.findIndex(value => value === listener), 1);
    },
};

export function OverlayComponent() {
    let element: HTMLDivElement | null = null;

    {
        let [ isVisible, setVisibility ] = useState(false);
        overlay.isVisible                = () => isVisible;

        overlay.setVisibility = (value: boolean) => {
            if (value === overlay.isVisible()) {
                return;
            }

            if (value) {
                visibilityCounter++;
            } else {
                visibilityCounter--;
            }

            setVisibility(visibilityCounter > 0);

            function predicate(listener: Listener) {
                if (listener.level !== (value ? visibilityCounter : visibilityCounter + 1)) {
                    return false;
                }

                if (listener.event === "visibilitychanged")
                    return true;

                return listener.event === (value ? "show" : "hide");
            }

            listeners.filter(predicate).forEach(event => event.callback());
        };
    }

    function initialize() {
        if (instantiated) {
            throw "Cannot have more than one instance of overlay";
        }

        instantiated = true;

        return function () {
            instantiated          = false;
            overlay.setVisibility = overlay.isVisible = () => { throw "Overlay used after being unmounted"; };
        }
    }

    function onClick(event: MouseEvent) {
        if (element === event.target || element && element.contains(event.target as HTMLElement)) {
            overlay.setVisibility(false);
        }
    }

    useEffect(initialize, []);

    const attachListeners = useCallback(newElement => {
        if (element) {
            element.removeEventListener("pointerdown", onClick);
        }

        element = newElement;

        if (element) {
            element.addEventListener("pointerdown", onClick);
        }
    }, [ element ]);

    return (
        <RenderIf condition={ overlay.isVisible() } fadeDuration={ 200 }>
            <div className="overlay" ref={ attachListeners }/>
        </RenderIf>
    )
}
