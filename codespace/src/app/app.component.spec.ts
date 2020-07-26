import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as data from './../assets/data.json';
import { AppComponent } from './app.component';
import { AppUtil } from './app.util';
import { MatDialogMock } from './mat-dialog.mock';
import { TaskListItemComponent } from './task-list-item/task-list-item.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TaskListItemComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatSnackBarModule,
        DragDropModule
      ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    component = debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('taskList', () => {
    it('should return the taskList', () => {
      component['appService'].taskList = (data as any).default;
      const taskList = component.taskList;
      expect(taskList).toEqual((data as any).default);
    });
  });

  describe('dropCompleteList', () => {
    it('should reorder array items according to the event', () => {
      const reorderArrayItemSpy = spyOn(AppUtil, 'reorderArrayItem');
      reorderArrayItemSpy.calls.reset();
      component.dropCompleteList({} as CdkDragDrop<string[], string[]>);
      expect(reorderArrayItemSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('addTaskList', () => {
    it('should open the edit item dialog if max limit of task list is not reached', () => {
      component['appService'].taskList = [{
        taskId: 1,
        taskTitle: 'To Do',
        tasks: [
          'Pay electricity bill',
          'Make grocery list'
        ]
      }, {
        taskId: 2,
        taskTitle: 'In Progress',
        tasks: [
          'Iron clothes'
        ]
      },
      {
        taskId: 3,
        taskTitle: 'Done',
        tasks: [
          'Buy running shoes'
        ]
      }, {
        taskId: 4,
        taskTitle: 'QA',
        tasks: [
          'Iron clothes'
        ]
      }];
      component.addTaskList();
    });
    it('should show a snackbar if max limit of task list is reached informing the same', () => {
      const snackBarSpy = spyOn(component['snackBar'], 'open');
      snackBarSpy.calls.reset();
      component['appService'].taskList = [{
        taskId: 1,
        taskTitle: 'To Do',
        tasks: [
          'Pay electricity bill',
          'Make grocery list'
        ]
      }, {
        taskId: 2,
        taskTitle: 'In Progress',
        tasks: [
          'Iron clothes'
        ]
      },
      {
        taskId: 3,
        taskTitle: 'Done',
        tasks: [
          'Buy running shoes'
        ]
      }, {
        taskId: 4,
        taskTitle: 'QA',
        tasks: [
          'Iron clothes'
        ]
      },
      {
        taskId: 5,
        taskTitle: 'QA Done',
        tasks: [
          'Buy running shoes'
        ]
      }];
      component.addTaskList();
      expect(snackBarSpy).toHaveBeenCalledTimes(1);
    });
    it('should add a entry into task list on successful close of dialog', () => { });
    it('should make no change if dialog is cancelled ', () => { });
  });

  describe('saveLists', () => {
    it('should call the appService saveLists method', () => {
      const saveListsSpy = spyOn(component['appService'], 'saveLists');
      saveListsSpy.calls.reset();
      component.saveLists();
      expect(saveListsSpy).toHaveBeenCalledTimes(1);
    });
  });
});
