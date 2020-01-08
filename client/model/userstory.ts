import { User } from "./user";
import { Status } from "./status";
import { Flags } from "./flags";

let count = parseInt(localStorage.getItem("nextUS") || "0");

export interface UserStory {
    id: string;
    name: string;
    status?: Status;
    flags: Flags | number;
    description?: string;
    assignees: User[];
    effort?: number;
    value?: number;

    created?: Date;
    started?: Date;
    done?: Date;
    validated?: Date;

    sprint?: unknown;
}

export function createUserStory(story: Partial<UserStory> & {name: string}): UserStory {
    const newStory= {
        assignees: [],
        id: "",
        flags: Flags.None,
        ...story,
    };

    if (!newStory.id) {
        newStory.id = `US-${ ++count }`;
    }

    localStorage.setItem("nextUS", count.toString());

    return newStory;
}
