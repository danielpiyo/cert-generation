import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.css'],
})
export class CheckFormComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;

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
    this.dataService.getDataLogin(loginPayload).subscribe(
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
        this.alertService.error(`Error occured, ${error.error}`);
        console.log('Error', error);
      }
    );
    // console.log(loginPayload);

    // this.loginForm.reset();
  }

  public loghasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };
}

export interface LoginPayload {
  user_email: string;
}
