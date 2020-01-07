import { User } from "./user";
import { Status } from "./status";

let count = 0;

export interface UserStory {
    id: string;
    name: string;
    status?: Status;
    flags?: number;
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
    return {
        assignees: [],
        ...story,
        id: `US-${ ++count }`,
    }
}
