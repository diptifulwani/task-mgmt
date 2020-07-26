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

  initializeTaskList() {
    this.taskList = this.dataService.getTaskList();
  }

  saveLists() {
    this.dataService.setTaskList(this.taskList);
  }
}
