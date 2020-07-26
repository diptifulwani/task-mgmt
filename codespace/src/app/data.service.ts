import { Injectable } from '@angular/core';
import { TaskListItem } from './task-list-item/task-list-item.model';
import { SESSION_STORE_KEY } from './app.constant';
import * as data from './../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {
  }

  getTaskList(): Array<TaskListItem> {
    // Get the list from session
    let taskList: any = window.sessionStorage.getItem(SESSION_STORE_KEY);
    if (taskList && taskList.trim().length > 0) {
      taskList = JSON.parse(taskList);
    } else {
      // if not present in session take from json file
      taskList = (data as any).default;
      // save to session
      window.sessionStorage.setItem(SESSION_STORE_KEY, JSON.stringify(taskList));
    }
    // Load to taskList property of service
    return taskList;
  }


  setTaskList(taskList: Array<TaskListItem>) {
    // save to session
    window.sessionStorage.setItem(SESSION_STORE_KEY, JSON.stringify(taskList));
  }
}
