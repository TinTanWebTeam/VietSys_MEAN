import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Subscription, Observable } from "rxjs";
import { AuthenticationService } from "../authentication/authentication.service";
import { Router } from "@angular/router";

@Injectable()
export class HttpClientService {
    private _http: Http;
    private _headers: Headers = new Headers();
    private _authSubscription: Subscription;

    constructor(private http: Http, private authenticationService: AuthenticationService, private router: Router) {
        this._http = http;
        this._authSubscription = authenticationService.authenticate$.subscribe(
            status => {
                console.log("%c HttpClientService", "color: green");
                console.log(status);
                if (status) {
                    this.createHeader();
                    console.log("%c Tạo header", "color: green");
                    console.log("%c Role", "color: green");
                    console.log(authenticationService.authenticateRole);
                    console.log("%c User", "color: green");
                    console.log(authenticationService.authenticateUser);
                    this.get('/api/user/authentication').subscribe(
                        (success: Response) => {
                            /* SAVE USER */
                            authenticationService.authenticateUser._id = success.json()['_id'];
                            authenticationService.authenticateUser.username = success.json()['username'];
                            authenticationService.authenticateUser.created_at = success.json()['created_at'];
                            authenticationService.authenticateUser.updated_at = success.json()['updated_at'];

                            /* SAVE ROLE */
                            let array_role = success.json()['role'];
                            authenticationService.authenticateRole = [];
                            for (let i = 0; i < array_role.length; i++) {
                                authenticationService.authenticateRole.push(array_role[i]);
                            }

                            /* SAVE AUTH */
                            // authenticationService.createAuthLocalStorage();
                            // this.authenticationService.notifyAuthenticate(true);

                            console.log("%c Role", "color: green");
                            console.log(authenticationService.authenticateRole);
                            console.log("%c User", "color: green");
                            console.log(authenticationService.authenticateUser);

                            console.log("%c Current URL: " + router.url, "color: yellow; background: black");
                            console.log("%c -----------------", "color: green");
                            router.navigate([router.url]);
                        },
                        (error: Response) => {
                            authenticationService.clearAuthLocalStorage();
                            authenticationService.notifyAuthenticate(false);
                        }
                    )
                    
                } else {
                    this.removeHeader();
                }
            }
        );
    }

    createHeader(): void {
        this._headers.delete('Authorization');
        this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('_token'));
    }

    createHeaderFromToken(token: string): void {
        this._headers.delete('Authorization');
        this._headers.append('Authorization', 'Bearer ' + token);
    }

    removeHeader(): void {
        this._headers.delete('Authorization');
    }

    get(url: string): Observable<Response> {
        return this._http.get(url, {
            headers: this._headers
        });
    }

    post(url: string, data: any): Observable<Response> {
        return this._http.post(url, data, {
            headers: this._headers
        })
    }

    put(url: string, data: any): Observable<Response> {
        return this._http.put(url, data, {
            headers: this._headers
        })
    }

    delete(url: string): Observable<Response> {
        return this._http.delete(url, {
            headers: this._headers
        })
    }

}