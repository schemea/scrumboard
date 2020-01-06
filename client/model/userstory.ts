import { User } from "./user";

export interface UserStory {
    name: string;
    description: string;
    assignees: User[];
    effort?: number;
    value?: number;

    created?: Date;
    started?: Date;
    done?: Date;
    validated?: Date;
}
