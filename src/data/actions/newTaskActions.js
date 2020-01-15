import {newTaskConstants} from '../constants';
import { addNewTask } from '../services';

export function fetchNewTask(newTask) {
  return dispatch => {
    dispatch(request());
    addNewTask(newTask)
      .then(res => dispatch(success(res)))
      .catch(err => {
        console.log(err);
        dispatch(failure(err));
      })
  };

  function request() {
    return {
      type: newTaskConstants.NEW_TASK_REQUEST,
    }
  }

  function success(newTask) {
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
