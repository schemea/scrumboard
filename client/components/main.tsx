import { StoryColumnComponent } from "./story-column";
import { createUserStory, UserStory } from "../model/userstory";
import React, { Fragment } from "react";
import { OverlayComponent } from "./overlay";
import { createUser } from "../model/user";
import { DragDropContext } from "react-beautiful-dnd";

const us = createUserStory("TEST");
us.assignees.push(createUser("Fred", "Dev"));
us.assignees.push(createUser("Frank", "Dev"));

const stories1 = [
    { ...us, id: "us-2" },
    { ...us, id: "us-3" },
    { ...us, id: "us-4" },
];

const stories2 = [
    { ...us, id: "us-5" },
    { ...us, id: "us-6" },
    { ...us, id: "us-7" },
];

export function MainComponent() {
    return (
        <Fragment>
            <OverlayComponent/>
            <DragDropContext onDragEnd={ function (result) {
                console.log(result)
            } }>
                <div className="flex-row">
                    <StoryColumnComponent stories={ stories1 }/>
                    <StoryColumnComponent stories={ stories2 }/>
                </div>
            </DragDropContext>
        </Fragment>
    )
}
