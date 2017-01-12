import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../models/user.model';
import { Role } from "../../models/role.model";

@Injectable()
export class AuthenticationService {

    public authenticate = new BehaviorSubject<Boolean>(false);
    public authenticate$ = this.authenticate.asObservable();
    public authenticateRole: Role[] = [];
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
    }

    createAuthLocalStorage(): void {
        /* CLEAR LOCAL STORAGE */
        this.clearAuthLocalStorage();
        /* CREATE TOKEN */
        localStorage.setItem('_token', this.authenticateToken);
    }

    clearAuthLocalStorage(): void {
        /* REMOVE TOKEN */
        localStorage.removeItem('_token');
    }

    notifyAuthenticate(status: Boolean): void {
        this.authenticate.next(status);
    }

}