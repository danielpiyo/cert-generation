import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { verificationPaylod } from '../models/user.model';
import { LoginPayload } from '../components/check-form/check-form.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getDataLogin(payLoad: LoginPayload) {
    return this.httpClient.post(environment.base_url, payLoad);
  }

  validateUserData(payLoad: verificationPaylod) {
    return this.httpClient.post(environment.base_url, payLoad);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
