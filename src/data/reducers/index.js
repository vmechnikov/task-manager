import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import newTaskReducer from './newTaskReducer';

const rootReducer = combineReducers({
	tasksReducer,
	newTaskReducer,
});

export default rootReducer;
