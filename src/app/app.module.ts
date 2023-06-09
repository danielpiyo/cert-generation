import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CheckFormComponent } from './components/check-form/check-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ValidateComponent } from './components/validate/validate.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './directives/alert/alert.component';
import { AlartModalComponent } from './components/alart-modal/alart-modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from './services/alert.service';
import { DataService } from './services/data.service';
import { AppService } from './services/app.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckFormComponent,
    AlertComponent,
    AlartModalComponent,
    // ValidateComponent,
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  entryComponents: [AlartModalComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    AlertService,
    DataService,
    AppService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
