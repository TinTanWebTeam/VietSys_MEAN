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
        this.httpClientService.post('/api/user/login', this.user)
            .subscribe(
            (success: Response) => {
                console.log(success);
                this.router.navigate(['/product']);

                // /* SAVE TOKEN */
                // this.authenticationService.authenticateToken = success.json().success;
                // this.getUserLogin(this.authenticationService.authenticateToken);
            },
            (error: Response) => {
                // this.toastr.error(error.json().error, 'Login Fails!');
            }
            )
    }

    public getUserLogin(token: string): void {
        this.httpClientService.createHeaderFromToken(token);
        this.httpClientService
            .get('/api/user/authenticate')
            .subscribe(
            (success: Response) => {
                /* SAVE USER */
                this.authenticationService.authenticateUser._id = Number(success.json().success.id);
                this.authenticationService.authenticateUser.username = success.json().success.name;
                this.authenticationService.authenticateUser.created_at = success.json().success.created_at;
                this.authenticationService.authenticateUser.updated_at = success.json().success.updated_at;

                /* SAVE ROLE */
                let array_role = success.json().success.role;
                for (let i = 0; i < array_role.length; i++) {
                    this.authenticationService.authenticateRole[i]._id = Number(array_role[i]._id);
                    this.authenticationService.authenticateRole[i].name = array_role[i].name;
                    this.authenticationService.authenticateRole[i].created_at = array_role[i].created_at;
                    this.authenticationService.authenticateRole[i].updated_at = array_role[i].updated_at;
                }

                /* SAVE AUTH */
                this.authenticationService.createAuthLocalStorage();
                this.authenticationService.notifyAuthenticate(true);
                this.router.navigate(['/product']);
            },
            (error: Response) => {
                // this.toastr.error(error.json().error, 'Get User Fails!');
            }
            );
    }
}
