import React from "react";

interface Props {
    label: string;
    onPointerDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function ActionComponent({ label, onPointerDown }: Props) {
    return (
        <div onPointerDown={ onPointerDown } className="action">
            { label }
        </div>
    )
}
