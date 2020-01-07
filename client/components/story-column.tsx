import { UserStoryComponent } from "./userstory";
import React from "react";
import "./story-column.scss";
import { Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { AppState } from "../store/reducer";
import { Status } from "../model/status";
import { selectStories, selectStoryOrder } from "../store";

let column = 0;

interface InnerProps {
    stories: string[];
    order: string[];
    id: Status;
    label: string;
}

interface Props {
    id: Status;
    label: string;
}

export const StoryColumnComponent = connect(
    (state: AppState, { id, label }: Props): InnerProps => ({
        stories: selectStories(state).filter(story => story.status === id).valueSeq().toArray().map(value => value.id),
        order: selectStoryOrder(state, id),
        id,
        label,
    }),
)(function (props: InnerProps) {
        // const [ stories, setStories ] = useState(props.stories);
        const stories = [
            ...props.order,
            ...props.stories.filter(value => !props.order.includes(value)),
        ];

        return (
            <Droppable droppableId={ props.id }>
                { provided => (
                    <div className="story-column">
                        <div className="title">{ props.label }</div>
                        <div className="drop-area" ref={ provided.innerRef } { ...provided.droppableProps }>
                            { stories.map((story, index) => (
                                <UserStoryComponent index={ index } id={ story } key={ story }/>
                            )) }
                            { provided.placeholder }
                        </div>
                    </div>
                ) }
            </Droppable>
        )
    },
);
