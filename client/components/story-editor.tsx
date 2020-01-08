import "./story-editor.scss";
import { UserStory } from "../model/userstory";
import React from "react";
import { ModalComponent } from "./modal";
import { InputField } from "./input-field";
import { connect } from "react-redux";
import { AppState } from "../store/reducer";
import { User } from "../model/user";
import lodash from "lodash";
import immutable from "immutable";
import { Flags } from "../model/flags";


interface InnerProps {
    users: User[];
    story: UserStory;
    onCloseRequested: () => void;
    onChange: (story: UserStory) => void;
}

interface Props {
    story: UserStory;
    onCloseRequested: () => void;
    onChange: (story: UserStory) => void;
}

export const StoryEditorComponent = connect(
    (state: AppState, props: Props): InnerProps => ({ ...props, users: state.users.valueSeq().toArray() }),
)(function ({ story, onChange, onCloseRequested, users }: InnerProps) {
        function setter<K extends keyof UserStory>(key: K) {
            return function (value: any) {
                const newStory = {
                    ...story,
                    [key]: isNaN(value) ? value : parseInt(value),
                };

                onChange(newStory);
            }
        }

        function assigneeChanged(user: User, event: React.ChangeEvent<HTMLInputElement>) {
            const value = event.target.checked;

            if (value) {
                onChange(lodash.update(story, [ "assignees" ], ((assignees: User[]) => [ ...assignees, user ])));
            } else {
                onChange(lodash.update(story, [ "assignees" ], ((assignees: User[]) => assignees.filter(value => value.id !== user.id))));
            }
        }

    const assignable = users.map(user => (
        <label key={ user.id }>
            <input type="checkbox" defaultChecked={ !!story.assignees.find(value => value.id === user.id) }
                   onChange={ assigneeChanged.bind(null, user) }/>
            { user.name } [{ user.role.toLocaleUpperCase() }]
        </label>
    ));

    function setBlocked(event: React.ChangeEvent<HTMLInputElement>) {
        const newStory = immutable.updateIn(
            story,
            [ "flags" ],
            (value: Flags | number) => {
                return  event.target.checked ? value | Flags.Blocked : value & ~Flags.Blocked;
            },
        );

        onChange(newStory);
    }

    return (
        <ModalComponent onCloseRequested={ onCloseRequested } minWidth="80vw" minHeight="80vh">
            <form className="story-editor">
                <InputField label="name" onChange={ setter("name") } value={ story.name || "" }/>
                <InputField label="effort" onChange={ setter("effort") } value={ story.effort || "" }/>
                <InputField label="value" onChange={ setter("value") } value={ story.value || "" }/>
                <InputField label="description" onChange={ setter("description") } value={ story.description || "" }/>

                <label>
                    <input type="checkbox" defaultChecked={ !!(story.flags & Flags.Blocked) }
                           onChange={ setBlocked }/>
                    Blocked
                </label>

                <br/>
                <br/>

                { assignable }
            </form>
            </ModalComponent>
        )
    },
)
