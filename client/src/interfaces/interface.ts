export interface User{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    avatar: string;
    domain: string;
    available: boolean;
}

export interface UserPayload{
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    avatar: string;
    domain: string;
    available: boolean;
}

export interface Team {
    id: string;
    name: string;
    admin: string;
    members: User[];
}