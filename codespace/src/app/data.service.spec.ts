import { TestBed } from '@angular/core/testing';

import * as data from '../assets/data.json';
import { DataService } from './data.service';
import { SESSION_STORE_KEY } from './app.constant';

describe('DataService', () => {
  let service: DataService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTaskList', () => {
    let sessionStorageGetItemSpy;
    let sessionStorageSetItemSpy;
    beforeEach(() => {
      sessionStorageGetItemSpy = spyOn(window.sessionStorage, 'getItem');
      sessionStorageGetItemSpy.calls.reset();
      sessionStorageSetItemSpy = spyOn(window.sessionStorage, 'setItem');
      sessionStorageSetItemSpy.calls.reset();
    });
    it('should fetch the taskList from session storage if exists', () => {
      window.sessionStorage.setItem(SESSION_STORE_KEY, JSON.stringify((data as any).default));
      service.getTaskList();
      expect(sessionStorageGetItemSpy).toHaveBeenCalledTimes(1);
    });
    it('should read taskList from json file if not in session storage', () => {
      window.sessionStorage.clear();
      service.getTaskList();
      expect(sessionStorageSetItemSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('setTaskList', () => {
    let sessionStorageSetItemSpy;
    beforeEach(() => {
      sessionStorageSetItemSpy = spyOn(window.sessionStorage, 'setItem');
      sessionStorageSetItemSpy.calls.reset();
    });
    it('should set the taskList into session storage', () => {
      service.setTaskList([]);
      expect(sessionStorageSetItemSpy).toHaveBeenCalledTimes(1);
    });
  });

});
