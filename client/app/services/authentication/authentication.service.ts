import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../models/user.model';
import { Role } from "../../models/role.model";

@Injectable()
export class AuthenticationService {

    public authenticate = new BehaviorSubject<Boolean>(false);
    public authenticate$ = this.authenticate.asObservable();
    public authenticateRole: Role[];
    public authenticateUser: User = new User();
    public authenticateToken: string;

    constructor() {
        this.checkAuthLocalStorage();
    }

    checkAuthLocalStorage(): void {
        try {
            if (localStorage.getItem('_token')) {
                /* GET AUTH FROM LOCAL STORAGE */
                this.getAuthLocalStorage();
                /* NOTIFY */
                this.notifyAuthenticate(true);
            } else {
                this.clearAuthLocalStorage();
                /* NOTIFY */
                this.notifyAuthenticate(false);
            }
        } catch (exception) {
            /* CLEAR AUTH IN LOCAL STORAGE */
            this.clearAuthLocalStorage();
            /* NOTIFY */
            this.notifyAuthenticate(false);
        }
    }

    getAuthLocalStorage(): void {
        /* GET TOKEN */
        this.authenticateToken = localStorage.getItem('_token');
        /* GET ROLE */
        let array_role: Role[] = JSON.parse(localStorage.getItem('_role'));
        for(let i = 0; i < array_role.length; i++){
            this.authenticateRole[i]._id = Number(array_role[i]._id);
            this.authenticateRole[i].name = array_role[i].name;
            this.authenticateRole[i].description = array_role[i].description;
            this.authenticateRole[i].created_at = array_role[i].created_at;
            this.authenticateRole[i].updated_at = array_role[i].updated_at;
        }
        
        /* GET USER */
        this.authenticateUser._id = Number(localStorage.getItem('_id'));
        this.authenticateUser.username = localStorage.getItem('username');
        this.authenticateUser.created_at = localStorage.getItem('created_at');
        this.authenticateUser.updated_at = localStorage.getItem('updated_at');
        this.authenticateUser.role = this.authenticateRole;
    }

    createAuthLocalStorage(): void {
        /* CLEAR LOCAL STORAGE */
        this.clearAuthLocalStorage();
        /* CREATE TOKEN */
        localStorage.setItem('_token', this.authenticateToken);

        /* CREATE USER */
        localStorage.setItem('_id', this.authenticateUser._id.toString());
        localStorage.setItem('username', this.authenticateUser.username);
        localStorage.setItem('created_at', this.authenticateUser.created_at);
        localStorage.setItem('updated_at', this.authenticateUser.updated_at);

        /* CREATE ROLE */
        localStorage.setItem('_role', JSON.stringify(this.authenticateRole));
    }

    clearAuthLocalStorage(): void {
        /* REMOVE TOKEN */
        localStorage.removeItem('_token');

        /* REMOVE USER */
        localStorage.removeItem('_id');
        localStorage.removeItem('username');
        localStorage.removeItem('created_at');
        localStorage.removeItem('updated_at');

        /* REMOVE ROLE */
        localStorage.removeItem('_role');
    }

    notifyAuthenticate(status: Boolean): void {
        this.authenticate.next(status);
    }

}