import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { AppUtil } from '../app.util';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditItemDialogComponent } from '../edit-item-dialog/edit-item-dialog.component';
import { TaskListItem } from './task-list-item.model';
import { DIALOG_WIDTH, MAX_TASK_LENGTH } from '../app.constant';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskListItemComponent implements OnInit {
  @Input() taskListItem: TaskListItem;
  @Input() taskList: Array<TaskListItem>;
  @Input() literals;

  get taskIds() {
    return this.taskList.map(task => task.taskId.toString());
  }

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  /**
   * Method to handle the event for editing a task list title.
   * It opens a dialog to perform the edit action.
   * This dialog is same as the one used for creation of the item.
   */
  editTaskListTitle(taskListItem) {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: DIALOG_WIDTH,
      data: {
        dialogTitle: this.literals.EDIT_ITEM_DIALOG_TITLE,
        name: taskListItem.taskTitle,
        validate: AppUtil.validateTaskList,
        taskList: this.taskList.filter(item => {
          return item !== taskListItem;
        })
      }
    });

    const closeSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        taskListItem.taskTitle = result;
      }
      closeSubscription.unsubscribe();
    });
  }

  /**
   * Method to handle the event for deletion of a task list item.
   * It opens a confirmation dialog for user
   * and upon getting the confirmation deletes the item from the list.
   */
  deleteTaskList(taskListItem) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: DIALOG_WIDTH,
      data: {
        title: this.literals.DELETE_ITEM_DIALOG_TITLE,
        message: this.literals.DELETE_ITEM_DIALOG_MESSAGE_PREFIX + taskListItem.taskTitle + this.literals.DELETE_ITEM_DIALOG_MESSAGE_SUFFIX
      }
    });

    const closeSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result === this.literals.YES) {
        const index = this.taskList.indexOf(taskListItem);
        this.taskList.splice(index, 1);
      }
      closeSubscription.unsubscribe();
    });
  }

  /**
   * Method to handle the event for drag and drop of tasks in the list
   */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /**
   * Method to handle the event for editing a task in the list.
   * It opens a dialog to perform the edit action.
   * This dialog is same as the one used for creation of the task.
   */
  editTaskTitle(taskListItem, task) {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: DIALOG_WIDTH,
      data: {
        dialogTitle: this.literals.EDIT_TASK_DIALOG_TITLE,
        name: task,
        validate: AppUtil.validateTask,
        tasks: taskListItem.tasks.filter(item => {
          return item !== task;
        })
      }
    });

    const closeSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = taskListItem.tasks.indexOf(task);
        taskListItem.tasks[index] = result;
      }
      closeSubscription.unsubscribe();
    });
  }

  /**
   * Method to handle the event for deletion of a task from the list.
   * It opens a confirmation dialog for user
   * and upon getting the confirmation deletes the task from the task list item.
   */
  deleteTask(taskListItem, task) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: DIALOG_WIDTH,
      data: {
        title: this.literals.DELETE_TASK_DIALOG_TITLE,
        message: this.literals.DELETE_TASK_DIALOG_MESSAGE_PREFIX + task +
          this.literals.DELETE_TASK_DIALOG_MESSAGE_SUB + taskListItem.taskTitle +
          this.literals.DELETE_TASK_DIALOG_MESSAGE_SUFFIX
      }
    });

    const closeSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result === this.literals.YES) {
        const index = taskListItem.tasks.indexOf(task);
        taskListItem.tasks.splice(index, 1);
      }
      closeSubscription.unsubscribe();
    });
  }

  /**
   * Method to handle the event for adding a task in the list.
   * It checks for the limit of the list and gives an error message in case of limit exceeded
   * else it opens a dialog to perform the add action.
   * Upon successful closure of dialog it adds an entry into the task list item
   */
  addTask(taskListItem) {
    if (taskListItem.tasks.length < MAX_TASK_LENGTH) {
      const dialogRef = this.dialog.open(EditItemDialogComponent, {
        width: DIALOG_WIDTH,
        data: {
          dialogTitle: this.literals.CREATE_TASK_DIALOG_TITLE,
          name: this.literals.EMPTY,
          validate: AppUtil.validateTask,
          tasks: taskListItem.tasks
        }
      });

      const closeSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result) {
          taskListItem.tasks.push(result);
        }
        closeSubscription.unsubscribe();
      });
    } else {
      this.snackBar.open(this.literals.MAX_LENGTH_REACHED, null, {
        duration: 2000,
      });
    }
  }
}
