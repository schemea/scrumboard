import "./userstory.scss"
import { UserStory } from "../model/userstory";
import React, { CSSProperties, useCallback, useState } from "react";
import classNames from "classnames";
import { RenderIf } from "./render-if";
import { MenuComponent } from "./menu";
import { Anchor } from "./anchor";
import { ActionComponent } from "./action";
import { StoryEditorComponent } from "./story-editor";

function noop() { }

interface Props {
    data: UserStory;
    onRemove?: (story: UserStory) => void;
}

function joinAssignees(assignees: string[]) {
    switch (assignees.length) {
        case 0:
            return "";
        case 1:
            return assignees[0];
        default:
            return assignees.slice(0, assignees.length - 1).join(", ") + " and " + assignees[assignees.length - 1];
    }
}

export function UserStoryComponent({ data, onRemove }: Props) {
    const [ isDragging, setDragging ] = useState(false);
    const [ position, setPosition ]   = useState({ x: 0, y: 0 });
    const [ isEditing, setIsEditing ] = useState(false);

    const [ isContextMenuVisible, setContextMenuVisibility ] = useState(false);

    let offset = { x: 0, y: 0 };

    if (!onRemove) {
        onRemove = noop;
    }

    function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);

        offset = {
            x: event.clientX,
            y: event.clientY,
        };

        setPosition({ x: 0, y: 0 });
        setDragging(true);
    }

    function onPointerMove(event: MouseEvent) {
        event.preventDefault();
        event.stopImmediatePropagation();

        setPosition({
            x: event.clientX - offset.x,
            y: event.clientY - offset.y,
        })
    }

    function onPointerUp(event: MouseEvent) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setDragging(false);
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
    }

    function getStyle(): CSSProperties | undefined {
        if (!isDragging) {
            return;
        }

        return {
            transform: `translate(${ position.x }px, ${ position.y }px)`,
        }
    }

    const onMore = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        setContextMenuVisibility(true);
    }, [ setContextMenuVisibility ]);

    const hideContextMenu = useCallback(() => {
        setContextMenuVisibility(false);
    }, [ setContextMenuVisibility ]);

    return (
        <div className={ classNames("user-story-container", { empty: isDragging }) }>
            <div className={ classNames("user-story", { dragging: isDragging }) } onPointerDown={ onPointerDown }
                 style={ getStyle() }>
                <div className="header">
                    { data.name }
                    <div className="flex-row flex-center">
                        <div className="badge effort">{ "effort" in data ? data.effort : '-' }</div>
                        <div className="badge value">{ "value" in data ? data.value : '-' }</div>
                        <button
                            className={ classNames("flat-button round-button more", { active: isContextMenuVisible }) }
                            onPointerDown={ onMore }>
                            <span className="material-icons">more_horiz</span>
                            <RenderIf condition={ isContextMenuVisible } fadeDuration={ 200 }>
                                <Anchor anchor={ { x: 1, y: 0 } } position={ { x: 0, y: 0 } }
                                        invertPositionX={ true }
                                        invertPositionY={ true }
                                        zIndex={ 101 }>
                                    <MenuComponent onHide={ hideContextMenu } hideOnActionTriggered={ true }>
                                        <ActionComponent label="EDIT" onPointerDown={ setIsEditing.bind(null, true) }/>
                                    </MenuComponent>
                                </Anchor>
                            </RenderIf>
                        </button>
                    </div>
                </div>
                <div className="content">
                    { data.name }
                </div>
                <RenderIf condition={ data.assignees.length > 0 }>
                    <div className="footer">
                        Assigned to { joinAssignees(data.assignees.map(value => value.name)) }
                    </div>
                </RenderIf>

            </div>
            <RenderIf condition={ isEditing } fadeDuration={ 200 }>
                <StoryEditorComponent story={ data } onCloseRequested={ setIsEditing.bind(null, false) }/>
            </RenderIf>
        </div>
    );
}
