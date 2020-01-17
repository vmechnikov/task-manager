import { tasksConstants } from '../constants';
import { getTasks } from '../services';

export function fetchTasks(pageNumber, sortField, sortDirection) {
	return dispatch => {
		dispatch(request());
		getTasks(pageNumber, sortField, sortDirection)
			.then(res => {
				if (res) {
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
