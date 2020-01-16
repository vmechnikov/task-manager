import { newTaskConstants } from '../constants';

const initialState = {
  newTask: null,
};

const newTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case newTaskConstants.NEW_TASK_REQUEST:
      return {
        ...state,
      };
    case newTaskConstants.NEW_TASK_SUCCESS:
      return {
        ...state,
        newTask: action.newTask
      };
    case newTaskConstants.NEW_TASK_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default newTaskReducer;
