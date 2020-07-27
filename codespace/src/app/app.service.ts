import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { TaskListItem } from './task-list-item/task-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  taskList: Array<TaskListItem>;
  themes: Array<string>;

  constructor(private dataService: DataService) {
    this.initializeTaskList();
    this.themes = [
      'theme-default',
      'theme-light',
      'theme-dark',
    ];
  }

  /**
   * Function to initialize the task list from data store
   */
  initializeTaskList() {
    this.taskList = this.dataService.getTaskList();
  }

  /**
   * Function to save the current state of task list to data store
   */
  saveLists() {
    this.dataService.setTaskList(this.taskList);
  }
}
