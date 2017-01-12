import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  public logOut(): void {
    this.authenticationService.clearAuthLocalStorage();
    this.authenticationService.notifyAuthenticate(false);
    this.router.navigate(['/login']);
  }

}
