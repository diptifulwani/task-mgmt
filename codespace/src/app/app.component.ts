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
  providers: [AppService] // Providing the service into the component using it to keep the bundle size to minimal
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

  /**
   * Method to handle the drag and drop of complete task list item
   */
  dropCompleteList(event: CdkDragDrop<string[]>) {
    AppUtil.reorderArrayItem(this.appService.taskList, event.previousIndex, event.currentIndex);
  }

  /**
   * Method to handle the event for adding a new entry into task list.
   * It checks for the limit of the list and gives an error message in case of limit exceeded
   * else it opens a dialog to perform the add action.
   */
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

      const closeSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const id = this.appService.taskList.length + 1;
          this.appService.taskList.push({
            taskId: id,
            taskTitle: result,
            tasks: [
            ]
          });
        }
        closeSubscription.unsubscribe(); // Unsubscribing the subscription after getting the user action for closing the dialog
      });
    } else {
      this.snackBar.open(this.literals.MAX_LENGTH_REACHED, null, {
        duration: 2000,
      });
    }
  }

  /**
   * Method to handle the event for save of lists into store
   */
  saveLists() {
    this.appService.saveLists();
  }

}
