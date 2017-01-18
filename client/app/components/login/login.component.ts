import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from "@angular/http";
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { HttpClientService } from '../../services/httpClient/httpClient.service';

import { User } from '../../models/user.model';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    public user: User = new User();

    /**
     *
     */
    constructor(private authenticationService: AuthenticationService, private httpClientService: HttpClientService, private router: Router) {

    }

    ngOnInit() {

    }

    public logIn(): void {
        this.httpClientService.post('/api/user/login', this.user).subscribe(
            (success: Response) => {
                // /* SAVE TOKEN */
                this.authenticationService.authenticateToken = success.json()['token'];
                this.getUserLogin(this.authenticationService.authenticateToken);
            },
            (error: Response) => {
                // this.toastr.error(error.json().error, 'Login Fails!');
            }
        )
    }

    public getUserLogin(token: string): void {
        this.httpClientService.createHeaderFromToken(token);
        this.httpClientService.get('/api/user/authentication').subscribe(
            (success: Response) => {
                /* SAVE USER */
                this.authenticationService.authenticateUser._id = success.json()['_id'];
                this.authenticationService.authenticateUser.username = success.json()['username'];
                this.authenticationService.authenticateUser.created_at = success.json()['created_at'];
                this.authenticationService.authenticateUser.updated_at = success.json()['updated_at'];

                /* SAVE ROLE */
                let array_role = success.json()['role'];
                this.authenticationService.authenticateRole = [];
                for (let i = 0; i < array_role.length; i++) {
                    this.authenticationService.authenticateRole.push(array_role[i]);
                }

                /* SAVE AUTH */
                this.authenticationService.createAuthLocalStorage();
                this.authenticationService.notifyAuthenticate(true);
                this.router.navigate(['/dashboard']);
            },
            (error: Response) => {
                // this.toastr.error(error.json().error, 'Get User Fails!');
            }
        );
    }
}
