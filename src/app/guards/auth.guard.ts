import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  loggedInUser: User;
  constructor(private router: Router, private alertService: AlertService) {
    this.loggedInUser = JSON.parse(`${localStorage.getItem('currentUser')}`);
    if (this.loggedInUser === null) {
      this.router.navigate(['/']);
    }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //   if (this.loggedInuser.status === 'completed') {
    //     // logged in so return true
    //     return true;
    //   }
    //   // not logged in so redirect to login page with the return url
    //   this.router.navigate([''], { queryParams: { returnUrl: state.url } });
    //   return false;
    // }
    switch (this.loggedInUser.status) {
      case 'completed':
        // logged in, so return true
        return true;
      case 'incomplete':
        // not completed course
        this.alertService.error(
          `Sorry ${this.loggedInUser.student_Name}, You have not completed the Course`
        );
        this.router.navigate([''], { queryParams: { returnUrl: state.url } });
        return false;
      default:
        // not logged in, so redirect to login page with the return url
        this.router.navigate([''], { queryParams: { returnUrl: state.url } });
        return false;
    }
  }
}
