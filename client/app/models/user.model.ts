import { Role } from "./role.model";
export class User {
    id?: number;
    name?: string;
    email?: string;
    picture?: string;
    phone?: string;
    address?: string;
    role?: Role;
    created_at?: string;
    updated_at?: string;
}