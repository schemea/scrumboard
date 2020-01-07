import "./modal.scss";
import React, { PropsWithChildren, useEffect } from "react";
import { overlay } from "./overlay";

interface Props {
    onCloseRequested: () => void;
    minWidth?: string;
    minHeight?: string;
}

export function ModalComponent({ children, onCloseRequested, minWidth, minHeight }: PropsWithChildren<Props>) {
    useEffect(() => {
        overlay.show();
        const listener = overlay.addEventListener("hide", onCloseRequested);

        return () => {
            overlay.removeEventListener(listener);
        }
    }, []);

    return (
        <div className="modal">
            <div className="content" style={ { minWidth, minHeight } }>
                { children }
            </div>
        </div>
    );
}
