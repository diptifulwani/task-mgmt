import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListItemComponent } from './task-list-item.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatDialogModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LITERALS } from '../app.constant';

describe('TaskListItemComponent', () => {
  let component: TaskListItemComponent;
  let fixture: ComponentFixture<TaskListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListItemComponent],
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
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListItemComponent);
    component = fixture.componentInstance;
    component.taskList = [];
    component.taskListItem = {
      taskId: 1,
      taskTitle: 'To Do',
      tasks: [
        'Pay electricity bill',
        'Make grocery list'
      ]
    };
    component.literals = LITERALS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
