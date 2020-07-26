import { MAX_CHAR_LENGTH } from './app.constant';

export class AppUtil {

  static validateTaskList(title, context): boolean {
    return AppUtil.validateDuplicateTaskList(title, context)
      && AppUtil.validateTitleMaxLength(title);
  }

  static validateTask(title, context): boolean {
    return AppUtil.validateDuplicateTask(title, context)
      && AppUtil.validateTitleMaxLength(title);
  }

  static validateDuplicateTaskList(title, context): boolean {
    const duplicateTaskListItem = context.data.taskList.find(taskListItem => {
      return taskListItem.taskTitle === title;
    });
    if (duplicateTaskListItem) {
      return false;
    } else {
      return true;
    }
  }

  static validateTitleMaxLength(title): boolean {
    return (title.length <= MAX_CHAR_LENGTH);
  }

  static reorderArrayItem(arr, index, insertAt) {
    const item = arr.splice(index, 1);
    arr.splice(insertAt, 0, item[0]);
  }

  static validateDuplicateTask(title, context): boolean {
    const duplicateTaskItem = context.data.tasks.find(task => {
      return task === title;
    });
    if (duplicateTaskItem) {
      return false;
    } else {
      return true;
    }
  }
}
