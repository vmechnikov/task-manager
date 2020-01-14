import { tasksConstants } from '../constants';

export const initialState = {
	loading: false,
	tasks: [],
};

const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case tasksConstants.TASKS_REQUEST:
			return {
				...state,
				loading: true
			};
		case tasksConstants.TASKS_SUCCESS:
			return {
				...state,
				loading: false,
				tasks: action.tasks
			};
		case tasksConstants.TASKS_FAILURE:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
};

export default tasksReducer;
