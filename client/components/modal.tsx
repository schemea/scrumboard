import "./modal.scss";
import React, { PropsWithChildren, useEffect } from "react";
import { overlay } from "./overlay";

interface Props {
    onCloseRequested: () => void;
}

export function ModalComponent({ children, onCloseRequested }: PropsWithChildren<Props>) {
    useEffect(() => {
        overlay.show();
        const listener = overlay.addEventListener("hide", onCloseRequested);

        return () => {
            overlay.removeEventListener(listener);
        }
    }, []);

    return (
        <div className="modal">
            <div className="content">
                { children }
            </div>
        </div>
    );
}
