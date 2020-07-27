/**
 * Constant for externalizing the literals(labels, messages, etc) used in the application
 */
export const LITERALS = {
  EMPTY: '',
  ADD_LIST: 'Add another list',
  CREATE_ITEM_DIALOG_TITLE: 'Create New Task List',
  EDIT_ITEM_DIALOG_TITLE: 'Edit Task List',
  DELETE_ITEM_DIALOG_TITLE: 'Confirm task list delete',
  DELETE_ITEM_DIALOG_MESSAGE_PREFIX: 'Are you sure you want to delete the task list ',
  DELETE_ITEM_DIALOG_MESSAGE_SUFFIX: '?',
  EDIT_TASK_DIALOG_TITLE: 'Edit Task',
  DELETE_TASK_DIALOG_TITLE: 'Confirm task delete',
  DELETE_TASK_DIALOG_MESSAGE_PREFIX: 'Are you sure you want to delete the task ',
  DELETE_TASK_DIALOG_MESSAGE_SUB: ' from ',
  DELETE_TASK_DIALOG_MESSAGE_SUFFIX: '?',
  CREATE_TASK_DIALOG_TITLE: 'Create New Task',
  YES: 'Yes',
  NO: 'No',
  ITEM_LABEL: 'Name',
  ITEM_LABEL_MANDATORY: 'Name is required',
  DUPLICATE_ITEM: 'Title should be unique and not exceeding the maximum limit',
  SAVE: 'Save',
  ADD_TASK: 'Add a card',
  STORE: 'Store the list',
  MAX_LENGTH_REACHED: 'Maximum limit reached'
};

/**
 * Constant for width of the dialog box used in the application to maintain uniformity
 */
export const DIALOG_WIDTH = '250px';

/**
 * Constant for the key used to store task list in session storage
 */
export const SESSION_STORE_KEY = 'TASK_LISTS';

/**
 * Constant to specify the maximum character limit for entity titles in the application
 */
export const MAX_CHAR_LENGTH = 24;

/**
 * Constant to specify the maxmimum no of task list items that can be added to the task list
 */
export const MAX_TASK_LIST_LENGTH = 5;

/**
 * Constant to specify the maxmimum no of tasks that can be added into a list item
 */
export const MAX_TASK_LENGTH = 5;


