import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-alart-modal',
  templateUrl: './alart-modal.component.html',
  styleUrls: ['./alart-modal.component.css'],
})
export class AlartModalComponent implements OnInit {
  message: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialogRef: MatDialogRef<AlartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
    this.dataService.logout();
    this.router.navigate(['/']);
  }
}
