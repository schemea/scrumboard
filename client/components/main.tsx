import { StoryColumnComponent } from "./story-column";
import { UserStory } from "../model/userstory";
import React, { Fragment } from "react";
import { OverlayComponent } from "./overlay";

const us: Partial<UserStory> = {
    name: "TEST",
    value: 13,
    assignees: [
        {
            name: "Fred",
            role: "Dev",
        },
        {
            name: "Frank",
            role: "Dev",
        },
    ],
};

export function MainComponent() {
    return (
        <Fragment>
            <OverlayComponent/>
            <StoryColumnComponent stories={ [ us, us, us ] as UserStory[] }/>
        </Fragment>
    )
}
