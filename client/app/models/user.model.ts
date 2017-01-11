import { Role } from "./role.model";
export class User {
    _id?: number;
    username: string;
    password: string;
    created_at?: string;
    updated_at?: string;
    role: Role[];

    /**
     *
     */
    constructor() {
        this.username = "";
        this.password = "";
    }
}