import React, { PropsWithChildren, useCallback, useEffect } from "react";
import "./menu.scss";
import { overlay } from "./overlay";

interface Action {
    label: string;
    onClick: () => void;
}

interface Props {
    onHide: () => void;
    hideOnActionTriggered?: boolean;
}

export function MenuComponent({ onHide, children, hideOnActionTriggered }: PropsWithChildren<Props>) {
    useEffect(() => {
        overlay.show();

        const listener = overlay.addEventListener("hide", function () {
            onHide();
        });


        return () => {
            overlay.removeEventListener(listener);
        }
    }, []);

    let ref: HTMLElement | undefined;

    const onPointerDown = useCallback(function (event: React.MouseEvent) {
            if (hideOnActionTriggered && ref && event.target !== ref && ref.contains(event.target as HTMLElement)) {
                overlay.hide();
            }

            event.preventDefault();
            event.stopPropagation();
        }, [ ref ],
    );

    const setRef = useCallback(function (element: HTMLDivElement) {
        ref = element;
    }, [ ref ]);

    return (
        <div className="menu" ref={ setRef } onPointerDown={ onPointerDown }>
            { children }
        </div>
    )
}
