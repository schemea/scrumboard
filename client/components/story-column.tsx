import { UserStory } from "../model/userstory";
import { UserStoryComponent } from "./userstory";
import React, { useState } from "react";
import "./story-column.scss";

export function StoryColumnComponent(props: { stories: UserStory[] }) {
    const [stories, setStories] = useState(props.stories);

    return (
        <div className="story-column">
            { stories.map(story => <UserStoryComponent data={ story } key={ story.name }/>) }
        </div>
    )
}
