import { Component, OnInit, OnDestroy } from '@angular/core';
// @ts-ignore
import * as html2pdf from 'html2pdf.js';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loggedInuser: User;
  verication_details = '';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  dataSubscription: Subscription = new Subscription();

  constructor(private loginService: DataService, private router: Router) {
    this.loggedInuser = JSON.parse(`${localStorage.getItem('currentUser')}`);
  }

  ngOnInit(): void {
    this.verication_details = `Name-${this.loggedInuser.student_Name}, Code - RUDP${this.loggedInuser.user_ID}`;
  }

  generatePDF() {
    const element = document.getElementById('data-certificate');
    const options = {
      margin: [0.25, 0.25],
      filename: 'certificate.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 2,
        borderStyle: 'none',
        borderColor: '#ffffff',
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(options).save();
  }

  logOut() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.loginService.logout();
  }
}
