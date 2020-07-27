import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LITERALS } from '../app.constant';

@Component({
  selector: 'app-edit-item-dialog',
  templateUrl: './edit-item-dialog.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditItemDialogComponent {
  literals;
  hasName = true;
  isDuplicate = false;
  constructor(
    public dialogRef: MatDialogRef<EditItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.literals = LITERALS;
  }

  /**
   * Method to handle the close event of dialog.
   * It validates the data entered in the dialog and shows error messages accordingly,
   * else performs the successful closure of the dialog.
   */
  closeDialog() {
    const title = this.data.name.trim();
    if (!title) {
      this.hasName = false;
    } else {
      this.hasName = true;
      if (this.data.validate(title, this)) {
        this.isDuplicate = false;
        this.dialogRef.close(title);
      } else {
        this.isDuplicate = true;
      }
    }
  }

}
