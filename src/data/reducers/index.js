import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import newTaskReducer from './newTaskReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
	tasksReducer,
	newTaskReducer,
	authReducer,
});

export default rootReducer;
