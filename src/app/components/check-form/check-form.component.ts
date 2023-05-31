import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.css'],
})
export class CheckFormComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading: boolean = false;

  checkSubscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[^@]*@[^@]*')]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    const loginFormData = this.loginForm.value;
    const loginPayload: LoginPayload = { user_email: loginFormData.email };
    this.checkSubscription = this.dataService
      .getDataLogin(loginPayload)
      .subscribe(
        (res: any) => {
          this.loading = false;
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.alertService.success(
            'Details Found & Certificate generated',
            true
          );
          this.router.navigate(['/certificate']);
        },
        (error) => {
          this.loading = false;
          this.alertService.error(
            `Sorry, ${error.error}, Please check you email and try again`
          );
        }
      );

    // this.loginForm.reset();
  }

  logHasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  ngOnDestroy(): void {
    this.checkSubscription.unsubscribe();
  }
}

export interface LoginPayload {
  user_email: string;
}
