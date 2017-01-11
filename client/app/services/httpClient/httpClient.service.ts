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
                if (status) {
                    this.createHeader();
                    this.get('/api/authentication')
                        .subscribe(
                        (success: Response) => {

                        },
                        (error: Response) => {
                            this.authenticationService.clearAuthLocalStorage();
                            this.authenticationService.notifyAuthenticate(false);
                        }
                        );
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