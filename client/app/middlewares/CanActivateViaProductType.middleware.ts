import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class CanActivateViaProductType implements CanActivate {

    constructor(private authenticationService: AuthenticationService) { 

    }

    canActivate() {
        console.log("%c CanActivateViaProductType", "color: orange");
        let roles = this.authenticationService.authenticateRole.map(o => o.name);
        let roleProductType = roles.find(o => o == 'ProductType');
        console.log("%c " + roles, "color: orange");
        console.log("%c " + roleProductType, "color: orange");
        console.log("%c ---------------------------", "color: orange");
        if(roleProductType == undefined)
            return false;
        return true;
    }
}