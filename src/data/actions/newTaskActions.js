import {newTaskConstants} from '../constants';
import {addNewTask, editTaskStatus} from '../services';
import openNotificationWithIcon from '../helpers/Notification';

export function fetchNewTask(newTask) {
  return dispatch => {
    dispatch(request());
    addNewTask(newTask)
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
		editTaskStatus(task)
			.then(res => {
				console.log(res);
				// dispatch(success());
			})
	};

	function success() {
		return {
			type: newTaskConstants.EDIT_TASK_SUCCESS,
		}
	}

	function failure() {
		return {
			type: newTaskConstants.EDIT_TASK_FAILURE,
		}
	}
}