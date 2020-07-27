import { MAX_CHAR_LENGTH } from './app.constant';

export class AppUtil {

  /**
   * Function to validate a task list item
   */
  static validateTaskList(title, context): boolean {
    return AppUtil.validateDuplicateTaskList(title, context)
      && AppUtil.validateTitleMaxLength(title);
  }

  /**
   * Function to validate a task item
   */
  static validateTask(title, context): boolean {
    return AppUtil.validateDuplicateTask(title, context)
      && AppUtil.validateTitleMaxLength(title);
  }

  /**
   * Function to validate a task list item for duplicate entry
   */
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

  /**
   * Function to validate a specfied title for maximum character limit
   */
  static validateTitleMaxLength(title): boolean {
    return (title.length <= MAX_CHAR_LENGTH);
  }

  /**
   * Function to rearrange an array entry.
   * The specified array's item at position index is inserted at the position insertAt
   * and the array is rearranged accordingly.
   */
  static reorderArrayItem(arr, index, insertAt) {
    const item = arr.splice(index, 1);
    arr.splice(insertAt, 0, item[0]);
  }

  /**
   * Function to validate a task item for duplicate entry
   */
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
