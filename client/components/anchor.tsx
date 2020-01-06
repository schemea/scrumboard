import React, { CSSProperties, PropsWithChildren } from "react";
import classNames from "classnames";
import "./anchor.scss";

interface Props {
    anchor?: { x: number, y: number };
    className?: string;
    position?: { x?: number, y?: number };
    invertPositionX?: boolean;
    invertPositionY?: boolean;
    zIndex?: number;
}

export function Anchor(
    {
        children,
        anchor,
        className,
        position,
        invertPositionX,
        invertPositionY,
        zIndex,
    }: PropsWithChildren<Props>,
) {
    if (!anchor) {
        anchor = { x: 0.5, y: 0.5 };
    }

    function getAnchorStyle(): CSSProperties {
        if (position) {
            const style: CSSProperties = { position: "absolute" };

            if ("x" in position) {
                style[invertPositionX ? "right" : "left"] = position.x + "px";
            }

            if ("y" in position) {
                style[invertPositionY ? "bottom" : "top"] = position.y + "px";
            }

            return style;
        } else {
            return {
                position: "relative",
            }
        }
    }

    function getStyle(): CSSProperties {
        return {
            // @ts-ignore
            transform: `translate(${ -anchor.x * 100 }%, ${ -anchor.y * 100 }%)`,
            zIndex,
        }
    }

    return (
        <div className={ classNames(className || "", "anchor") } style={ getAnchorStyle() }>
            <div className="content" style={ getStyle() }>
                { children }
            </div>
        </div>
    );
}
