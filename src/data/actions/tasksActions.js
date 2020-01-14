import { tasksConstants } from '../constants';
import { getTasks } from '../services';

export function fetchTasks(pageNumber) {
	return dispatch => {
		dispatch(request());
		getTasks(pageNumber)
			.then(res => {
				if (res) {
					console.log(res.tasks);
					dispatch(success(res.tasks));
				}
			})
			.catch(err => {
				console.log('error:');
				console.log(err);
				dispatch(failure());
			});
	};

	function request() {
		return {
			type: tasksConstants.TASKS_REQUEST
		}
	}

	function success(tasks) {
		return {
			type: tasksConstants.TASKS_SUCCESS,
			tasks
		}
	}

	function failure() {
		return {
			type: tasksConstants.TASKS_FAILURE
		}
	}
}
