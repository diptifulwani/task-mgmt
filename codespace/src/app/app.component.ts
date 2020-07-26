import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { LITERALS, DIALOG_WIDTH, MAX_TASK_LIST_LENGTH } from './app.constant';
import { AppService } from './app.service';
import { AppUtil } from './app.util';
import { EditItemDialogComponent } from './edit-item-dialog/edit-item-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppService]
})
export class AppComponent {
  literals;
  selectedTheme = 'theme-light';
  themes;

  constructor(private dialog: MatDialog, private appService: AppService, private snackBar: MatSnackBar) {
    this.literals = LITERALS;
    this.themes = appService.themes;
  }

  get taskList() {
    return this.appService.taskList;
  }

  dropCompleteList(event: CdkDragDrop<string[]>) {
    AppUtil.reorderArrayItem(this.appService.taskList, event.previousIndex, event.currentIndex);
  }

  addTaskList() {
    if (this.taskList.length < MAX_TASK_LIST_LENGTH) {
      const dialogRef = this.dialog.open(EditItemDialogComponent, {
        width: DIALOG_WIDTH,
        data: {
          dialogTitle: this.literals.CREATE_ITEM_DIALOG_TITLE,
          name: this.literals.EMPTY,
          validate: AppUtil.validateTaskList,
          taskList: this.appService.taskList
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const id = this.appService.taskList.length + 1;
          this.appService.taskList.push({
            taskId: id,
            taskTitle: result,
            tasks: [
            ]
          });
        }
      });
    } else {
      this.snackBar.open(this.literals.MAX_LENGTH_REACHED, null, {
        duration: 2000,
      });
    }
  }

  saveLists() {
    this.appService.saveLists();
  }

}
