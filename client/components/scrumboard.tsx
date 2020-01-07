import "./scrumboard.scss";
import { StoryColumnComponent } from "./story-column";
import { Status } from "../model/status";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import React from "react";
import { selectColumnOrder, store } from "../store";
import { actions } from "../store/actions";
import { connect } from "react-redux";
import { AppState } from "../store/reducer";

function onDragEnd(result: DropResult) {
    store.dispatch(actions.updateUserStory({
        id: result.draggableId,
        status: result.destination?.droppableId as unknown as Status,
    }));
}

interface InnerProps {
    columns: Status[];
}

export const ScrumboardComponent = connect(
    (state: AppState): InnerProps => ({ columns: selectColumnOrder(state) }),
)(function ({ columns }: InnerProps) {
    const children = columns.map(id => <StoryColumnComponent id={ id } label={ id } key={ id }/>)

    return (
        <DragDropContext onDragEnd={ onDragEnd }>
            <div className="scrumboard">
                { children }
            </div>
        </DragDropContext>
    )
});
