import { UserStory } from "../model/userstory";
import { UserStoryComponent } from "./userstory";
import React, { useState } from "react";
import "./story-column.scss";
import { Droppable } from "react-beautiful-dnd";

let column = 0;

export function StoryColumnComponent(props: { stories: UserStory[] }) {
    const [ stories, setStories ] = useState(props.stories);

    return (
        <Droppable droppableId={ `col-${ ++column }` }>
            { provided => (
                <div className="story-column" ref={ provided.innerRef } { ...provided.droppableProps }>
                    { stories.map((story, index) => (
                        <UserStoryComponent index={ index } data={ story }/>
                    )) }
                    { provided.placeholder }
                </div>
            ) }
        </Droppable>
    )
}
