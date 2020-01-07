let count: number = 0;

export interface User {
    name: string;
    role: string;
    id: string;
}

export function createUser(name: string, role: string): User {
    return {
        name,
        role,
        id: `user-${ ++count }`,
    }
}
