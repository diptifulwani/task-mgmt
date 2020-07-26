import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import * as data from './../assets/data.json';

describe('AppService', () => {
  let service: AppService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initializeTaskList', () => {
    it('should initialize taskList attribute of service', () => {
      spyOn(service['dataService'], 'getTaskList').and.returnValue((data as any).default);
      service.taskList = [];
      service.initializeTaskList();
      expect(service.taskList.length).toEqual(3);
    });
  });

  describe('saveLists', () => {
    it('should call the setTaskList method of DataService', () => {
      const setTaskListSpy = spyOn(service['dataService'], 'setTaskList');
      setTaskListSpy.calls.reset();
      service.saveLists();
      expect(setTaskListSpy).toHaveBeenCalledTimes(1);
    });
  });

});
