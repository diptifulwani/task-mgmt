import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EditItemDialogComponent } from './edit-item-dialog.component';
import { MatDialogRefMock } from '../mat-dialog-ref.mock';

describe('EditItemDialogComponent', () => {
  let component: EditItemDialogComponent;
  let fixture: ComponentFixture<EditItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditItemDialogComponent],
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
        { provide: MatDialogRef, useValue: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('closeDialog', () => {
    it('should show validation error if the title is not entered', () => {
      component.hasName = true;
      component.data.name = ' ';
      component.closeDialog();
      expect(component.hasName).toBeFalsy();
    });
    it('should show duplicate entry error if the title entered already exists', () => {
      component.isDuplicate = false;
      component.data.name = 'test';
      component.data.validate = () => false;
      component.closeDialog();
      expect(component.isDuplicate).toBeTruthy();
    });
    it('should close the dialog if entered title passes all validations', () => {
      component.dialogRef = (new MatDialogRefMock()) as any;
      component.data.name = 'test';
      component.data.validate = () => true;
      const spy = spyOn(component.dialogRef, 'close');
      spy.calls.reset();
      component.closeDialog();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

});
