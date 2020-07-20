import { ID } from "@core/models/id";
import { User } from "@user/models/user";

export interface Story {
    id: ID
    name: string
    value: number
    effort: number

    assignees: User[]
}
