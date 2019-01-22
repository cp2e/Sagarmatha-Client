import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class GuardService implements CanActivate {

  constructor( private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (JSON.parse(localStorage.getItem('userDetails'))) {
      return true;
    } else {
      this.router.navigate(['/Login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}