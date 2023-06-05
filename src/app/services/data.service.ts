import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { verificationPaylod } from '../models/user.model';
import { LoginPayload } from '../components/check-form/check-form.component';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private appService: AppService
  ) {}

  getDataLogin(payLoad: LoginPayload) {
    return this.httpClient.post(environment.base_url, payLoad);
  }

  validateUserData(payLoad: verificationPaylod) {
    return this.httpClient.post(environment.base_url, payLoad);
  }

  // logout() {
  //   localStorage.removeItem('currentUser');
  //   localStorage.clear();
  //   this.router.navigate(['/']);
  // }

  logout() {
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentUser');
    this.appService.setUserLoggedIn(false);
    localStorage.clear();
  }
}
