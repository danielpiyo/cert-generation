import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pdfGenerator';
  year: any;
  myHour = new Date();

  constructor() {
    this.year = this.year = new Date().getFullYear();
  }
}
