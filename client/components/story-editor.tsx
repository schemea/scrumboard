import { UserStory } from "../model/userstory";
import React from "react";
import { ModalComponent } from "./modal";

interface Props {
    story: UserStory;
    onCloseRequested: () => void;
}

export function StoryEditorComponent({ story, onCloseRequested }: Props) {
    return (
        <ModalComponent onCloseRequested={ onCloseRequested } minWidth="80vw" minHeight="80vh">
            COMING SOON!
        </ModalComponent>
    )
}
