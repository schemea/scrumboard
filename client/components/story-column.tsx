import { UserStoryComponent } from "./userstory";
import React, { Dispatch } from "react";
import "./story-column.scss";
import { Droppable } from "react-beautiful-dnd";
import { connect, DispatchProp } from "react-redux";
import { AppState } from "../store/reducer";
import { Status } from "../model/status";
import { selectStories, selectStoryOrder } from "../store";
import { actions, Actions } from "../store/actions";

let column = 0;

interface InnerProps {
    stories: string[];
    order: string[];
    id: Status;
}

interface Props {
    id: Status;
}

//todo: put it in a better place
const LabelMap: { [k in Status]: string } = {
    [Status.Backlog]: "BACKLOG",
    [Status.Done]: "DONE",
    [Status.InProgress]: "DOING",
    [Status.Reviewing]: "CODE REVIEW",
    [Status.ToDo]: "TO DO",
};

export const StoryColumnComponent = connect(
    (state: AppState, { id }: Props): InnerProps => ({
        stories: selectStories(state).filter(story => story.status === id).valueSeq().toArray().map(value => value.id),
        order: selectStoryOrder(state, id),
        id,
    }),
)(function (props: InnerProps & DispatchProp<Actions>) {
    // const [ stories, setStories ] = useState(props.stories);
        const stories = [
            ...props.order,
            ...props.stories.filter(value => !props.order.includes(value)),
        ];

        if (stories.length !== props.order.length) {
            props.dispatch(actions.setStoriesOrder(props.id, stories));
        }

        return (
            <Droppable droppableId={ props.id }>
                { provided => (
                    <div className="story-column">
                        <div className="title">{ LabelMap[props.id] }</div>
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
