import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { Role } from '../../models/role.model';

@Component({
  moduleId: module.id,
  selector: 'app-aside',
  templateUrl: './aside.component.html'
})
export class AsideComponent implements OnInit {

  private roles: string[] = [];
  private _authSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService) {
    this._authSubscription = this.authenticationService.authenticate$.subscribe(
      status => {
        console.log("%c Navigation", "background: green; color: white");
        console.log(status);
        
        if (status) {
          this.roles = this.authenticationService.authenticateRole.map(function (o) {
            return o.name;
          });
        } else {
          this.roles = [];
        }

        console.log(this.roles);
        console.log("%c ----------", "background: green; color: white");
      }
    )
  }

  ngOnInit() {
  }

}
