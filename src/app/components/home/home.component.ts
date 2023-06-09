import { Component, OnInit, OnDestroy } from '@angular/core';
// @ts-ignore
import * as html2pdf from 'html2pdf.js';
import { DatePipe } from '@angular/common';
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

  constructor(
    private loginService: DataService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.loggedInuser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  ngOnInit(): void {
    this.verication_details = `Genuine certificate,  Name: ${this.loggedInuser.student_Name}, Code: RUDP${this.loggedInuser.user_ID}`;
  }

  formatDateWithSuffix(date: Date): string {
    const day = new Date(date).getDate();
    let suffix = 'th';

    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }
    const formattedDate = this.datePipe.transform(date, 'd, MMM y');
    if (formattedDate) {
      return formattedDate.replace(/\b(\d+)\b/, '$1' + suffix);
    } else {
      return '';
    }
  }

  generatePDF() {
    const element = document.getElementById('data-certificate');
    const options = {
      margin: [0.05, 0.05],
      filename: 'certificate.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 3,
        borderStyle: 'none',
        // borderColor: '#ffffff',
        letterRendering: true,
        useCORS: true,
        ignoreBorders: true, // Add this line to ignore borders
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(options).save();
  }

  logOut() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    // this.loginService.logout();
    this.router.navigate(['']);
  }
}
