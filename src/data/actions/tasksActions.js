import { tasksConstants } from '../constants';
import { getTasks } from '../services';

export function fetchTasks(pageNumber) {
	return dispatch => {
		dispatch(request());
		getTasks(pageNumber)
			.then(res => {
				if (res) {
					console.log(res);
					dispatch(success(res.tasks, res.total_task_count));
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

	function success(tasks, totalTasksCount) {
		return {
			type: tasksConstants.TASKS_SUCCESS,
			tasks,
			totalTasksCount
		}
	}

	function failure() {
		return {
			type: tasksConstants.TASKS_FAILURE
		}
	}
}
