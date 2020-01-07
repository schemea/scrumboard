import { User } from "./user";

let count = 0;

export interface UserStory {
    id: string;
    name: string;
    description?: string;
    assignees: User[];
    effort?: number;
    value?: number;

    created?: Date;
    started?: Date;
    done?: Date;
    validated?: Date;
}

export function createUserStory(name: string): UserStory {
    return {
        id: `us-${ ++count }`,
        name,
        assignees: [],
    }
}
