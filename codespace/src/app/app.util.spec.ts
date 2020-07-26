import * as data from './../assets/data.json';
import { AppUtil } from './app.util';
import { MAX_CHAR_LENGTH } from './app.constant';

describe('AppUtil', () => {
  let title;
  let context;

  describe('validateTaskList', () => {
    beforeEach(() => {
      title = 'test';
      context = {
        data: {
          taskList: (data as any).default
        }
      };
    });
    it('should validate the taskList for duplicate entry ', () => {
      const validateDuplicateTaskListSpy = spyOn(AppUtil, 'validateDuplicateTaskList');
      validateDuplicateTaskListSpy.calls.reset();
      AppUtil.validateTaskList(title, context);
      expect(validateDuplicateTaskListSpy).toHaveBeenCalledTimes(1);
    });

    it('should validate the taskList title for maximum characters ', () => {
      const validateTitleMaxLengthSpy = spyOn(AppUtil, 'validateTitleMaxLength');
      validateTitleMaxLengthSpy.calls.reset();
      AppUtil.validateTaskList(title, context);
      expect(validateTitleMaxLengthSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateTask', () => {
    beforeEach(() => {
      title = 'test';
      context = {
        data: {
          tasks: ((data as any).default)[0].tasks
        }
      };
    });
    it('should validate the task for duplicate entry ', () => {
      const validateDuplicateTaskSpy = spyOn(AppUtil, 'validateDuplicateTask');
      validateDuplicateTaskSpy.calls.reset();
      AppUtil.validateTask(title, context);
      expect(validateDuplicateTaskSpy).toHaveBeenCalledTimes(1);
    });

    it('should validate the task title for maximum characters ', () => {
      const validateTitleMaxLengthSpy = spyOn(AppUtil, 'validateTitleMaxLength');
      validateTitleMaxLengthSpy.calls.reset();
      AppUtil.validateTask(title, context);
      expect(validateTitleMaxLengthSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateDuplicateTaskList', () => {
    beforeEach(() => {
      title = 'test';
      context = {
        data: {
          taskList: (data as any).default
        }
      };
    });
    it('should return false if the specified title already exists', () => {
      expect(AppUtil.validateDuplicateTaskList(context.data.taskList[0].taskTitle, context)).toBeFalsy();
    });

    it('should return true if the specified title does not exists', () => {
      expect(AppUtil.validateDuplicateTaskList(title, context)).toBeTruthy();
    });
  });

  describe('validateTitleMaxLength', () => {
    let length;
    let testTitle;
    it('should return true if the title character length is in MAX_CHAR_LENGTH limit', () => {
      length = MAX_CHAR_LENGTH - 2;
      testTitle = new Array(length).join('a');
      expect(AppUtil.validateTitleMaxLength(testTitle)).toBeTruthy();
    });
    it('should return false if the title character length is not in MAX_CHAR_LENGTH limit', () => {
      length = MAX_CHAR_LENGTH + 2;
      testTitle = new Array(length).join('a');
      expect(AppUtil.validateTitleMaxLength(testTitle)).toBeFalsy();
    });
  });

  describe('reorderArrayItem', () => {
    it('should insert the array item at specified index into specified position', () => {
      // tslint:disable-next-line: prefer-const
      let arr = [1, 2, 3, 4, 5];
      AppUtil.reorderArrayItem(arr, 1, 3);
      expect(arr).toEqual([1, 3, 4, 2, 5]);
    });
  });

  describe('validateDuplicateTask', () => {
    beforeEach(() => {
      title = 'test';
      context = {
        data: {
          tasks: ((data as any).default)[0].tasks
        }
      };
    });
    it('should return false if the specified title already exists', () => {
      expect(AppUtil.validateDuplicateTask(context.data.tasks[0], context)).toBeFalsy();
    });

    it('should return true if the specified title does not exists', () => {
      expect(AppUtil.validateDuplicateTask(title, context)).toBeTruthy();
    });
  });

});
