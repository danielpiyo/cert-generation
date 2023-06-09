import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private alertService: AlertService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('AuthGuard canActivate method called');

    const loggedInUser = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    // console.log('User:', loggedInUser);

    if (loggedInUser && loggedInUser.status === 'completed') {
      // console.log('Authentication passed. Allowing access.');
      return true;
    }

    // console.log('Authentication failed. Redirecting to login page.');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
