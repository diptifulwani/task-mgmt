import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LITERALS } from '../app.constant';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationDialogComponent implements OnInit {
  literals;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.literals = LITERALS;
  }

  ngOnInit() {
  }

}
