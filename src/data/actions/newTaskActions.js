import {newTaskConstants} from '../constants';
import { addNewTask, editTaskStatus, editTaskText } from '../services';
import openNotificationWithIcon from '../helpers/Notification';

export function fetchNewTask(newTask) {
  return dispatch => {
    dispatch(request());
    return addNewTask(newTask)
      .then(res => dispatch(success(res)))
      .catch(err => {
        dispatch(failure(err));
      })
  };

  function request() {
    return {
      type: newTaskConstants.NEW_TASK_REQUEST,
    }
  }

  function success(newTask) {
	  openNotificationWithIcon('success', 'Задание успешно добавлено.');

    return {
      type: newTaskConstants.NEW_TASK_SUCCESS,
      newTask
    }
  }

  function failure() {
    return {
      type: newTaskConstants.NEW_TASK_FAILURE,
    }
  }
}

export function updateTaskStatus(task) {
	return dispatch => {
		return editTaskStatus(task)
			.then(res => res)
	};
}

export function updateTaskText(task) {
	return dispatch => {
		return editTaskText(task)
			.then(res => res);
	}
}
