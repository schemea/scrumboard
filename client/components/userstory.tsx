import "./userstory.scss"
import { UserStory } from "../model/userstory";
import React, { useCallback, useState } from "react";
import classNames from "classnames";
import { RenderIf } from "./render-if";
import { MenuComponent } from "./menu";
import { Anchor } from "./anchor";
import { ActionComponent } from "./action";
import { StoryEditorComponent } from "./story-editor";
import { Draggable } from "react-beautiful-dnd";

function noop() { }

interface Props {
    data: UserStory;
    onRemove?: (story: UserStory) => void;
    index: number;
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

export function UserStoryComponent({ data, onRemove, index }: Props) {
    const [ isEditing, setIsEditing ] = useState(false);

    const [ isContextMenuVisible, setContextMenuVisibility ] = useState(false);

    if (!onRemove) {
        onRemove = noop;
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
        <Draggable draggableId={ data.id } index={ index }>
            { provided => (
                <div className="user-story-container"
                     ref={ provided.innerRef } { ...provided.dragHandleProps } { ...provided.draggableProps }>
                    <div className="user-story">
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
                                                <ActionComponent label="EDIT"
                                                                 onPointerDown={ setIsEditing.bind(null, true) }/>
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
            ) }
        </Draggable>
    );
}
