import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { AppService } from 'src/app/services/app.service';
import { DataService } from 'src/app/services/data.service';
import { AlartModalComponent } from '../alart-modal/alart-modal.component';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.css'],
})
export class CheckFormComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading: boolean = false;

  currentperson: any;

  checkSubscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private alertService: AlertService,
    private appService: AppService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[^@]*@[^@]*')]],
    });
  }

  onSubmit() {
    const loginFormData = this.loginForm.value;
    if (loginFormData.email != '') {
      this.loading = true;
      const loginPayload: LoginPayload = { user_email: loginFormData.email };
      this.checkSubscription = this.dataService
        .getDataLogin(loginPayload)
        .subscribe(
          (res: any) => {
            this.loading = false;
            this.currentperson = res;
            // storing the user data
            this.appService.setUserLoggedIn(true);
            switch (this.currentperson.status) {
              case 'completed':
                localStorage.setItem(
                  'currentUser',
                  JSON.stringify(this.currentperson)
                );
                this.alertService.success(
                  `Congratulations, ${this.currentperson.student_Name} details found and Certificate generated`,
                  true
                );
                this.router.navigate(['/certificate']);
                break;
              case 'incomplete':
                this.router.navigate(['']);
                this.loading = false;

                const successMsg = `Hello, ${this.currentperson.student_Name}, please complete your course first`;
                const type = 'warning';
                this.openModal(successMsg, type);
                break;
            }
          },
          (error) => {
            this.loading = false;
            const errorMsg = error.error;
            const type = 'error';
            this.openModal(errorMsg, type);
          }
        );
    } else {
      this.loading = false;
    }

    // this.loginForm.reset();
  }

  logHasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  openModal(message: any, type: any): void {
    this.dialog.open(AlartModalComponent, {
      data: {
        message,
        type,
      },
      width: '400px', // Set the width of the modal
    });
  }

  ngOnDestroy(): void {
    this.checkSubscription.unsubscribe();
  }
}

export interface LoginPayload {
  user_email: string;
}
